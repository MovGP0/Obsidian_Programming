---
title: "Image Metadata with C Sharp"
---
[ImageSharp](https://docs.sixlabors.com/articles/imagesharp/metadata.html) can read, create, and change common EXIF, IPTC, XMP, and ICC profiles in managed C#.[^1] It does not replace ExifTool for broad forensic inspection of MakerNotes, private tags, duplicate fields, or container-specific metadata.

> [!WARNING]
> Loading and saving an image with ImageSharp decodes and re-encodes its pixels. It can also omit unsupported metadata. Never run this workflow on forensic evidence. Copy the source first, and keep its hash. Use ExifTool when you need a metadata-only operation with wider format and tag support.

The example below was compiled with .NET 8 and ImageSharp 3.1.11. Review the Six Labors license before you select a package version.[^2]

## Install ImageSharp

```powershell
dotnet add package SixLabors.ImageSharp --version 3.1.11
```

## Read, Create, and Change EXIF

`Image.Identify` reads image information without loading pixel data. `Image.Load` is required before this example saves a changed image.[^1]

```csharp
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Metadata.Profiles.Exif;
using SixLabors.ImageSharp.PixelFormats;

namespace ImageMetadataExample;

internal static class Program
{
    private static void Main()
    {
        ReadExif("photo.jpg");
        UpdateExif("photo.jpg", "photo-with-metadata.jpg");
        CreateImage("created.jpg");
    }

    private static void ReadExif(string path)
    {
        var info = Image.Identify(path);
        var exif = info.Metadata.ExifProfile;

        PrintTag(exif, ExifTag.Make, "Make");
        PrintTag(exif, ExifTag.Model, "Model");
        PrintTag(exif, ExifTag.DateTimeOriginal, "Captured");
        PrintTag(exif, ExifTag.Software, "Software");
    }

    private static void UpdateExif(string inputPath, string outputPath)
    {
        using var image = Image.Load(inputPath);
        var exif = image.Metadata.ExifProfile ?? new ExifProfile();

        exif.SetValue(ExifTag.Software, "MetadataExample 1.0");
        exif.SetValue(ExifTag.Artist, "Example Author");
        exif.RemoveValue(ExifTag.GPSLatitude);
        exif.RemoveValue(ExifTag.GPSLongitude);

        image.Metadata.ExifProfile = exif;
        image.SaveAsJpeg(outputPath);
    }

    private static void CreateImage(string outputPath)
    {
        using var image = new Image<Rgba32>(640, 480, Color.White);
        var exif = new ExifProfile();

        exif.SetValue(ExifTag.Software, "MetadataExample 1.0");
        exif.SetValue(ExifTag.ImageDescription, "Created image");
        image.Metadata.ExifProfile = exif;

        image.SaveAsJpeg(outputPath);
    }

    private static void PrintTag<T>(ExifProfile? exif, ExifTag<T> tag, string label)
    {
        if (exif?.TryGetValue(tag, out var value) == true)
        {
            Console.WriteLine($"{label}: {value.Value}");
        }
    }
}
```

`SetValue` creates the tag if it does not exist and replaces it if it does. `RemoveValue` removes the selected tag. Removing only `GPSLatitude` and `GPSLongitude` is not a complete privacy scrub. Also inspect `GPSAltitude`, `GPSDateStamp`, `GPSTimeStamp`, location text in XMP or IPTC, thumbnails, and embedded previews.

## Sign with C2PA

Ordinary EXIF and XMP have no universal trusted signature. Use [[C2PA Content Credentials]] to add signed provenance.

The current Content Authenticity Initiative SDK list does not include an official .NET SDK.[^3] A C# application can call the official `c2patool` as a child process.[^4] `ProcessStartInfo.ArgumentList` avoids command-line quoting errors.

Create `manifest.json`:

```json
{
  "alg": "es256",
  "private_key": "signing/es256_private.key",
  "sign_cert": "signing/es256_certs.pem",
  "claim_generator_info": [
    {
      "name": "MetadataExample",
      "version": "1.0.0"
    }
  ],
  "title": "Created image"
}
```

Then call `c2patool`:

```csharp
using System.Diagnostics;

namespace C2PaSigningExample;

internal static class Program
{
    private static async Task Main()
    {
        await SignWithC2PaToolAsync(
            "created.jpg",
            "manifest.json",
            "signed.jpg");
    }

    private static async Task SignWithC2PaToolAsync(
        string sourcePath,
        string manifestPath,
        string outputPath,
        CancellationToken cancellationToken = default)
    {
        var startInfo = new ProcessStartInfo
        {
            FileName = "c2patool",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false
        };

        startInfo.ArgumentList.Add(sourcePath);
        startInfo.ArgumentList.Add("--manifest");
        startInfo.ArgumentList.Add(manifestPath);
        startInfo.ArgumentList.Add("--output");
        startInfo.ArgumentList.Add(outputPath);
        startInfo.ArgumentList.Add("--create");
        startInfo.ArgumentList.Add("digitalCreation");

        using var process = Process.Start(startInfo)
            ?? throw new InvalidOperationException("Could not start c2patool.");
        var standardOutputTask = process.StandardOutput.ReadToEndAsync(cancellationToken);
        var standardErrorTask = process.StandardError.ReadToEndAsync(cancellationToken);

        await process.WaitForExitAsync(cancellationToken);
        var standardOutput = await standardOutputTask;
        var standardError = await standardErrorTask;

        if (process.ExitCode != 0)
        {
            throw new InvalidOperationException(
                $"c2patool failed with exit code {process.ExitCode}: {standardError}");
        }

        Console.WriteLine(standardOutput);
    }
}
```

This example declares a new non-generative digital creation. Use `trainedAlgorithmicMedia` for a fully AI-generated image. For an edit, use the edit intent and add the original image as a parent ingredient. Do not claim `digitalCapture` unless a trusted capture device or capture application can support that assertion.

Validate the result:

```powershell
c2patool '.\signed.jpg' --detailed
```

Do not ship a production private key with the application. Use a protected signing service, remote signer, or hardware security module.

## Related Notes

- [[Image Metadata Analysis]]
- [[C2PA Content Credentials]]
- [[Image Metadata with Rust]]

## References

[^1]: [ImageSharp metadata documentation](https://docs.sixlabors.com/articles/imagesharp/metadata.html)
[^2]: [Six Labors licensing](https://sixlabors.com/pricing/)
[^3]: [Content Authenticity Initiative SDK overview](https://opensource.contentauthenticity.org/docs/introduction/)
[^4]: [Official c2patool usage](https://github.com/contentauth/c2pa-rs/blob/main/cli/docs/usage.md)
