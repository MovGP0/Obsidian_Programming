## Reading Compressed Assembly

This script will extract assemblies that are compressed and embedded using Costura:
```csharp
using System;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Reflection.Metadata;
using System.Reflection.PortableExecutable;

void Main()
{
    // Path to the EXE containing Costura-embedded resources
    var executablePath = @"C:\Path\To\Some.dll";

    if (!File.Exists(executablePath))
    {
        throw new FileNotFoundException("Executable not found.", executablePath);
    }

    // Target: user's Downloads folder (no subfolder)
    var downloadsFolder = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
        "Downloads");

    Console.WriteLine($"Source EXE    : {executablePath}");
    Console.WriteLine($"Target folder : {downloadsFolder}");
    Console.WriteLine();

    using var fileStream = File.OpenRead(executablePath);
    using var peReader = new PEReader(fileStream);

    var metadataReader = peReader.GetMetadataReader();

    const string costuraPrefix = "costura.";
    const string compressedSuffix = ".compressed";

    // Managed resources are in the #Resources stream, described by this directory
    var resourcesDirectory = peReader.PEHeaders.CorHeader.ResourcesDirectory;
    var resourcesRva = resourcesDirectory.VirtualAddress;

    foreach (var handle in metadataReader.ManifestResources)
    {
        var manifestResource = metadataReader.GetManifestResource(handle);
        string resourceName = metadataReader.GetString(manifestResource.Name);

        // We only want embedded (not linked) Costura resources with ".compressed"
        if (manifestResource.Implementation.IsNil &&
            resourceName.StartsWith(costuraPrefix, StringComparison.OrdinalIgnoreCase) &&
            resourceName.EndsWith(compressedSuffix, StringComparison.OrdinalIgnoreCase))
        {
            Console.WriteLine($"Found resource: {resourceName}");

            // Offset is relative to the start of the managed resources stream (#Resources)
            int resourceRva = resourcesRva + manifestResource.Offset;

            // Get a reader starting at that RVA
            var sectionData = peReader.GetSectionData(resourceRva);
            var resourceDataReader = sectionData.GetReader();

            // First 4 bytes: length of the resource data
            int resourceLength = resourceDataReader.ReadInt32();

            // Next 'resourceLength' bytes: the actual resource payload (Deflate-compressed assembly)
            byte[] compressedBytes = resourceDataReader.ReadBytes(resourceLength);

            // Derive file name: "costura.newtonsoft.json.dll.compressed" -> "newtonsoft.json.dll"
            string outputFileName = resourceName.Substring(
                costuraPrefix.Length,
                resourceName.Length - costuraPrefix.Length - compressedSuffix.Length);

            string outputPath = Path.Combine(downloadsFolder, outputFileName);

            Console.WriteLine($"  → Decompressing to: {outputPath}");

            using var compressedStream = new MemoryStream(compressedBytes, writable: false);
            using var deflateStream = new DeflateStream(compressedStream, CompressionMode.Decompress);
            using var outputFileStream = File.Create(outputPath);

            deflateStream.CopyTo(outputFileStream);
        }
    }

    Console.WriteLine();
    Console.WriteLine("Done.");
}
```
## References

- [Costura](https://github.com/Fody/Costura)
