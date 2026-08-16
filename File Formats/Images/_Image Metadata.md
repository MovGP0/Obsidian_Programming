---
title: "Image Metadata"
---
**Image metadata** describes an image, its capture device, its processing history, or its provenance. Common systems include Exchangeable Image File Format (**EXIF**), Extensible Metadata Platform (**XMP**), International Press Telecommunications Council (**IPTC**) fields, camera MakerNotes, and Coalition for Content Provenance and Authenticity (**C2PA**) Content Credentials.

> [!IMPORTANT]
> Ordinary metadata is evidence, not proof. A person can remove, copy, or forge EXIF, XMP, IPTC, and MakerNote values. A valid and trusted C2PA manifest is stronger because its signature binds assertions to the asset.

There is no complete universal list of metadata values. Fields such as `Software`, `CreatorTool`, comments, and PNG text keys accept free text. Applications can also add private tags.

## Topics

- [[Image Metadata Analysis]] gives the inspection workflow, ExifTool commands, inconsistency checks, and evidence ranking.
- [[Image Capture Metadata]] lists camera, lens, exposure, phone, location, and time fields.
- [[Image Editing Metadata]] lists software fingerprints, XMP history values, and Adobe processing fields.
- [[AI Image Metadata]] lists AI source declarations, prompt fields, models, workflows, and common generator fingerprints.
- [[C2PA Content Credentials]] explains signed provenance, actions, validation, and signing security.
- [[Image Metadata with C Sharp]] gives C# examples for reading, creating, changing, and signing metadata.
- [[Image Metadata with Rust]] gives Rust examples for reading, creating, changing, and signing metadata.

## Evidence Limits

```text
Camera EXIF present  != proof of a camera original
Camera EXIF absent   != proof of AI generation
AI metadata present  = useful positive evidence
AI metadata absent   != evidence against AI generation
```

A genuine camera image can lose all metadata when a service resizes it. An AI image can contain copied camera metadata. Use all available evidence and report uncertainty.

## Assessment Layers

```text
1. Preserve
   original file + SHA-256 hash
             |
             v
2. Inspect capture
   EXIF + MakerNotes + QuickTime + dates + GPS
             |
             v
3. Inspect processing
   software fields + XMP history + develop settings
             |
             v
4. Inspect AI indicators
   source type + prompt + workflow + model + agent
             |
             v
5. Validate provenance
   C2PA binding + signature + trust + timestamp + ingredients
             |
             v
6. Test consistency
   device + lens + dimensions + dates + thumbnail + actions
```

Metadata covers provenance and processing declarations. If it is absent or inconclusive, use pixel-level image forensics. Pixel analysis is a separate subject and also has error limits.
