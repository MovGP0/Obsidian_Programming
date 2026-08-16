---
title: "Image Editing Metadata"
---
Editing metadata can identify software, events, and settings in a processing chain. It normally cannot show the exact visible change.

## Fields to Inspect

```text
Software
ProcessingSoftware
ImageEditor
RAWDevelopingSoftware
ImageEditingSoftware
MetadataEditingSoftware
CreatorTool
HistorySoftwareAgent
HistoryAction
HistoryParameters
HistoryWhen
DocumentAncestors
DerivedFromDocumentID
IngredientsDocumentID
```

`XMP:CreatorTool` identifies the first known tool that created the resource. It is not necessarily the last tool that saved it.[^1]

## Common Free-Text Fingerprints

These strings are examples, not controlled values. Versions, platform suffixes, and capitalization vary.

| Value fragment | Likely software or pipeline | What it supports |
| --- | --- | --- |
| `Adobe Photoshop` | Photoshop | Photoshop or compatible software wrote the value. |
| `Adobe Photoshop Camera Raw` | Adobe Camera Raw | A RAW or raster file passed through Camera Raw. |
| `Adobe Photoshop Lightroom`, `Lightroom Classic` | Lightroom | Lightroom developed, managed, or exported the image. |
| `Capture One`, `Phase One` | Capture One | Capture One developed or exported the image. |
| `GIMP` | GNU Image Manipulation Program | GIMP processed or exported the file. |
| `Affinity Photo` | Affinity Photo | Affinity Photo processed or exported the file. |
| `darktable` | darktable | darktable developed or exported the image. |
| `RawTherapee` | RawTherapee | RawTherapee developed or exported the image. |
| `DxO PhotoLab`, `DxO PureRAW` | DxO software | DxO developed or enhanced the image. |
| `ON1 Photo RAW` | ON1 software | ON1 processed or exported the image. |
| `Luminar`, `Luminar Neo` | Skylum software | Luminar processed or exported the image. Some operations can use AI. |
| `Pixelmator`, `Pixelmator Pro` | Pixelmator | Pixelmator processed or exported the image. |
| `Snapseed` | Snapseed | A mobile editing workflow processed the image. |
| `VSCO` | VSCO | A mobile editing or export workflow processed the image. |
| `paint.net` | Paint.NET | Paint.NET processed or exported the image. |
| `ImageMagick` | ImageMagick | An automated conversion or processing pipeline wrote the file. |
| `GraphicsMagick` | GraphicsMagick | An automated conversion or processing pipeline wrote the file. |
| `Lavf`, `FFmpeg`, `libav` | FFmpeg or Libav | A media conversion pipeline wrote the file. |
| `libvips`, `sharp` | libvips or Sharp | A server-side resize or conversion pipeline probably wrote the file. |

`Software = Adobe Photoshop` means that Photoshop or compatible software participated in the file. It does not prove deceptive manipulation. A simple open-and-save operation can write the same value.

## XMP Editing History Values

An XMP `History` sequence can contain one event per operation. Adobe defines these standard `HistoryAction` values:[^2]

```text
converted
copied
created
cropped
edited
filtered
formatted
version_updated
printed
published
managed
produced
resized
saved
```

Read related fields as one event:

| Field | Function |
| --- | --- |
| `HistoryAction` | Operation, such as `cropped`, `edited`, or `saved`. |
| `HistoryChanged` | Parts of the resource that changed. |
| `HistoryParameters` | Additional operation details. |
| `HistorySoftwareAgent` | Application and version that performed the operation. |
| `HistoryWhen` | Event time. |
| `HistoryInstanceID` | Identifier for the output resource instance. |

Example:

```text
[XMP-xmpMM] HistoryAction        : saved, converted, saved
[XMP-xmpMM] HistorySoftwareAgent : Adobe Photoshop Camera Raw 17.0, Adobe Photoshop 26.1
[XMP-xmpMM] HistoryWhen          : 2025:03:02 14:20:41+01:00, 2025:03:02 14:21:07+01:00
```

This is strong evidence that Adobe software processed the file. The history is still ordinary writable XMP.

## Adobe Camera Raw and Photoshop Fields

| Group or tag | Indication |
| --- | --- |
| `XMP-crs:HasCrop`, `CropTop`, `CropLeft`, `CropBottom`, `CropRight`, `CropAngle` | Camera Raw crop or rotation. |
| `Exposure2012`, `Contrast2012`, `Highlights2012`, `Shadows2012` | Camera Raw tone adjustments. |
| `Temperature`, `Tint`, `WhiteBalance` | Camera Raw white-balance settings. |
| `Clarity2012`, `Dehaze`, `Sharpness`, `LuminanceSmoothing` | Detail, haze, sharpness, or noise changes. |
| `RetouchAreas`, `MaskValue`, local-adjustment fields | Retouching or masking data. |
| `AlreadyApplied` and correction fields | Lens or RAW corrections were applied. |
| `DocumentAncestors` | IDs of documents involved in placement or copy workflows. |
| `DerivedFrom*`, `Ingredients*` | Links to source document versions or ingredients. |
| `PhotoshopQuality`, `PhotoshopFormat`, `ProgressiveScans` | Photoshop JPEG-save information.[^3] |
| `LayerCount`, `LayerNames`, `LayerBlendModes`, `LayerOpacities` | Layer structure in PSD, PSB, or embedded Photoshop data.[^3] |

Some non-Adobe applications write Adobe-compatible fields. A field name alone does not identify the writer.

## Related Notes

- [[Image Metadata Analysis]]
- [[Image Capture Metadata]]
- [[AI Image Metadata]]
- [[C2PA Content Credentials]]

## References

[^1]: [Adobe XMP Basic namespace](https://developer.adobe.com/xmp/docs/xmp-namespaces/xmp/)
[^2]: [Adobe XMP ResourceEvent action values](https://developer.adobe.com/xmp/docs/xmp-namespaces/xmp-data-types/resource-event/)
[^3]: [ExifTool Photoshop tags](https://exiftool.org/TagNames/Photoshop.html)
