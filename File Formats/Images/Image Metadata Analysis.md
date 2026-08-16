---
title: "Image Metadata Analysis"
---
Use the original JPEG, HEIC, PNG, WebP, TIFF, or RAW file. Do not use a screenshot or an image copied from a document. A platform can remove metadata or create a new file during upload, download, or conversion.

## Preserve the File

Work on a copy. Record a hash before inspection:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath '.\photo.jpg'
```

[ExifTool](https://exiftool.org/) reads files by default. It changes a file only when a command assigns, copies, or deletes a tag.[^1]

## First Inspection

Use this command for a complete metadata dump:

```powershell
exiftool -a -u -G1 -s '.\photo.jpg'
```

| Option | Function |
| --- | --- |
| `-a` | Show duplicate tags. |
| `-u` | Show unknown tags. |
| `-G1` | Show the metadata group for each tag. |
| `-s` | Show the ExifTool tag name. |
| `-n` | Show stored numeric values instead of converted labels. |

Check structural warnings and all time fields:

```powershell
exiftool -validate -warning -error -a '.\photo.jpg'
exiftool -time:all -a -G1 -s '.\photo.jpg'
```

Search for common processing and AI terms:

```powershell
exiftool -a -u -G1 -s '.\photo.jpg' |
    Select-String -Pattern '(?i)software|creator|history|photoshop|lightroom|gimp|affinity|capture one|darktable|rawtherapee|dxo|luminar|imagemagick|prompt|workflow|seed|sampler|model|stable diffusion|comfy|fooocus|invoke|novelai|midjourney|firefly|openai|dall|generative|trainedalgorithmicmedia|c2pa'
```

See [[C2PA Content Credentials]] for C2PA inspection and validation commands.

## Metadata Groups

| Group | Typical content | Forensic use |
| --- | --- | --- |
| `File` and `System` | File type, size, and filesystem dates | Describes this copy. It is weak provenance evidence. |
| `EXIF` and `ExifIFD` | Camera, lens, exposure, capture time, and source type | Can support a camera-capture history. Most fields are writable. |
| `MakerNotes` | Vendor-specific camera or phone data | A coherent intact block is harder to reproduce than basic EXIF. |
| `XMP` | Creator tool, editing history, document IDs, and develop settings | Can identify applications and later processing. |
| `IPTC` | Caption, creator, rights, date, and digital source type | Can contain a declared origin or editorial description. |
| `Photoshop` | Adobe resource blocks, JPEG settings, layers, and paths | Can show Adobe-compatible processing or saved document structure. |
| `QuickTime` | HEIC, MOV, and MP4 make, model, software, and device keys | Important for phone images and Live Photos. |
| `PNG` | Text chunks, XMP, EXIF, prompts, and workflows | Often contains local AI-generator parameters. |
| `JUMBF` | C2PA manifests and assertions | Contains signed provenance when Content Credentials are present. |

## Inconsistency Checks

Look for one coherent history across all groups.

| Condition | Possible explanation |
| --- | --- |
| Camera and lens values describe incompatible equipment | Copied metadata, bad decoding, manual lens data, or a composite workflow. |
| Capture date is before the camera or software existed | Incorrect device clock, manually entered date, copied metadata, or forgery. |
| `ModifyDate` or `MetadataDate` is years after `DateTimeOriginal` | Later processing, metadata maintenance, or an intentionally changed date. |
| `ModifyDate` is before `DateTimeOriginal` | Clock error, time-zone error, copied fields, or manual modification. |
| GPS time conflicts with capture time and offset | Clock error, time-zone error, copied GPS, or altered metadata. |
| Embedded thumbnail shows a different crop or image | Main image changed without a matching thumbnail update, or the file has multiple previews. |
| Final dimensions do not match a normal camera mode | Crop, resize, panorama, computational capture, or export. |
| Basic EXIF exists but expected MakerNotes are absent | A service stripped MakerNotes, an editor rebuilt EXIF, or fields were copied. |
| Duplicate tags have different values | Metadata blocks were not reconciled, or a tool added values without removing old ones. |
| AI prompt or model data occurs with camera EXIF | AI editing, camera input, a composite, or copied metadata. |
| C2PA binding or signature validation fails | Asset or manifest changed, data is corrupt, or the validator lacks required data. |
| C2PA validates but the signer is not trusted | Manifest integrity is valid, but the selected trust policy does not establish the signer identity. |

Warnings are clues. They are not automatic proof of forgery.

## Evidence Strength

| Evidence | Relative strength | Limitation |
| --- | ---: | --- |
| Valid binding, signature, trusted C2PA signer, and trusted timestamp | Very strong | Proves signed assertions, not scene truth. |
| Camera-signed C2PA with `digitalCapture` and a coherent chain | Very strong | Depends on device identity, trust policy, and implementation. |
| Original RAW file with intact MakerNotes and coherent sensor data | Strong | Can still be processed, converted, or deliberately constructed. |
| Detailed coherent camera or phone EXIF plus MakerNotes | Moderate | Ordinary metadata remains writable and removable. |
| XMP history with actions, times, and software agents | Moderate | Useful editing evidence, but ordinary XMP is writable. |
| Positive AI prompt, model, workflow, or source-type metadata | Moderate to strong | It can be copied. Signed provenance makes it stronger. |
| One `Software` or `CreatorTool` value | Weak to moderate | Identifies a participant, not the edit. |
| `DateTimeOriginal` alone | Weak | Easy to change and often has no time zone. |
| Filename or filesystem date | Very weak | Describes this copy or a naming convention. |
| No metadata | No provenance evidence | Stripping is common for both genuine and generated images. |

## Report Language

Do not report that an image is original only because the metadata looks normal. Use calibrated terms such as `confirmed`, `strong evidence`, `supports`, `inconclusive`, and `contradicts`.

Example:

> The file has a coherent Canon capture record with intact MakerNotes. Its XMP history shows a later Lightroom export. No positive AI metadata is present. This supports a camera-origin workflow, but ordinary metadata cannot exclude later manipulation or removed AI provenance.

## Related Notes

- [[Image Capture Metadata]]
- [[Image Editing Metadata]]
- [[AI Image Metadata]]
- [[C2PA Content Credentials]]

## References

[^1]: [ExifTool application documentation](https://exiftool.org/exiftool_pod2.html)
