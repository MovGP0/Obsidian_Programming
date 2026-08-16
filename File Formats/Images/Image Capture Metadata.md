---
title: "Image Capture Metadata"
---
Capture metadata identifies the declared device, lens, exposure, position, and time. A coherent group is more useful than one field. All ordinary values remain writable.

## Camera and Lens Tags

| Tag | Common value pattern | Interpretation |
| --- | --- | --- |
| `Make` | `Canon`, `NIKON CORPORATION`, `SONY`, `FUJIFILM`, `Apple`, `Google`, `samsung` | Declared device manufacturer. Wording and capitalization vary. |
| `Model` or `CameraModelName` | `Canon EOS R5`, `NIKON Z 9`, `ILCE-7RM5`, `iPhone 15 Pro`, `Pixel 9 Pro` | Declared camera or phone model. |
| `SerialNumber`, `InternalSerialNumber` | Vendor-specific text or number | Can link files to one camera body. Software can remove it for privacy. |
| `CameraFirmware`, `FirmwareVersion` | Version text | Can support a device-specific history. |
| `LensMake` | Manufacturer name | Declared lens manufacturer. |
| `LensModel` | Lens name or phone camera module | Useful for body-and-lens consistency checks. |
| `LensID` | Vendor-specific ID or decoded lens name | Can be ambiguous when lenses share an ID. |
| `LensSerialNumber` | Vendor-specific text or number | Can link files to one lens. |
| `ImageUniqueID` | Camera ID, UUID, or application-generated value | Can link renditions. It does not prove authenticity. |

Common names are not controlled values. For example, `SONY`, `Sony`, and `Sony Corporation` can all occur. Search with case-insensitive partial matches.

## Exposure and Sensor Tags

A camera file usually contains a coherent set of photographic values:

| Information | Tags |
| --- | --- |
| Shutter | `ExposureTime`, `ShutterSpeedValue` |
| Aperture | `FNumber`, `ApertureValue` |
| Sensitivity | `ISO`, `ISOSpeed`, `RecommendedExposureIndex` |
| Focal length | `FocalLength`, `FocalLengthIn35mmFormat` |
| Exposure mode | `ExposureProgram`, `ExposureMode` |
| Metering | `MeteringMode` |
| Flash | `Flash`, `FlashMode`, `FlashFired` |
| Focus | `FocusMode`, `AFPoint`, `SubjectDistance` |
| White balance | `WhiteBalance`, vendor white-balance tags |
| Sensor description | `SensingMethod`, `CFAPattern`, `BitsPerSample` |
| Dimensions | `ExifImageWidth`, `ExifImageHeight`, `ImageWidth`, `ImageHeight` |
| Position | `GPSLatitude`, `GPSLongitude`, `GPSAltitude`, `GPSDateTime` |

The values must agree. For example, the lens must support the reported focal length and aperture. Image dimensions must be plausible for the declared camera mode.

## Controlled EXIF Source Values

ExifTool converts stored numbers to the labels in this table. Use `-n` to see the numbers.[^1]

| Tag | Stored value | ExifTool label | Meaning |
| --- | ---: | --- | --- |
| `FileSource` | `1` | `Film Scanner` | Scan from transparent film. |
| `FileSource` | `2` | `Reflection Print Scanner` | Scan from a print or other reflective source. |
| `FileSource` | `3` | `Digital Camera` | Declared digital camera capture. |
| `SceneType` | `1` | `Directly photographed` | Declared direct capture of a scene. |
| `CompositeImage` | `0` | `Unknown` | File does not declare its composite state. |
| `CompositeImage` | `1` | `Not a Composite Image` | Declared non-composite image. |
| `CompositeImage` | `2` | `General Composite Image` | Image made from multiple source images. |
| `CompositeImage` | `3` | `Composite Image Captured While Shooting` | Camera combined images during capture, such as HDR or panorama. |

These values are declarations. A person can copy or write them.

## Direct EXIF Software Fields

EXIF 3.1 includes direct fields for the capture and editing chain:[^1]

| Tag | Expected content |
| --- | --- |
| `ImageEditor` | Editor application or editing person. |
| `CameraFirmware` | Camera firmware name or version. |
| `RAWDevelopingSoftware` | Software that developed a RAW file. |
| `ImageEditingSoftware` | Software that edited the image. |
| `MetadataEditingSoftware` | Software that edited metadata. |
| `ProcessingSoftware` | Older free-text processing-software field. |
| `Software` | Firmware, encoder, editor, exporter, or library. Meaning depends on the writer. |

Many current files do not contain the newer fields.

## Phone-Specific Values

Phone cameras use computational processing. This does not by itself mean that a person manipulated the image.

### Apple MakerNotes

ExifTool can decode these iPhone fields:[^2]

| Tag | Known values or pattern | Meaning |
| --- | --- | --- |
| `HDRImageType` | `3 = HDR Image`; `4 = Original Image` | Identifies an HDR result or its original frame. |
| `ImageCaptureType` | `1 = ProRAW`; `2 = Portrait`; `10 = Photo`; `11 = Manual Focus`; `12 = Scene` | Identifies an Apple capture mode. |
| `CameraType` | `0 = Back Wide Angle`; `1 = Back Normal`; `6 = Front` | Identifies the phone camera position. |
| `BurstUUID` | UUID | Groups frames from one burst. |
| `ContentIdentifier` | UUID | Can associate related assets, such as a Live Photo pair. |
| `LivePhotoVideoIndex` | Numeric time index | Identifies the still frame in a Live Photo video. |
| `AccelerationVector` | Three numbers | Records device orientation or motion at capture. |
| `OISMode` | Numeric vendor value | Indicates optical stabilization data. |
| `SemanticStyle`, `SemanticStylePreset` | Vendor-specific values | Indicates Apple photographic-style processing. |

The combination of `Make = Apple`, an iPhone `Model`, a matching `LensModel`, and intact Apple MakerNotes is stronger than one field.

### Android and HEIC Keys

HEIC uses the ISO Base Media File Format. ExifTool can show some fields in `QuickTime` groups.[^3]

| ExifTool tag | Stored key | Meaning |
| --- | --- | --- |
| `AndroidMake` | `com.android.manufacturer` | Android device manufacturer. |
| `AndroidModel` | `com.android.model` | Android device model. |
| `AndroidVersion` | `com.android.version` | Android version. |
| `AndroidCaptureFPS` | `com.android.capture.fps` | Capture frame rate. |
| `AndroidTimeZone` | `samsung.android.utc_offset` | Samsung time-zone value. |
| `XiaomiHDR10` | `com.xiaomi.hdr10` | Xiaomi HDR flag. |
| `Make`, `Model`, `Software` | QuickTime keys | General device and encoder fields. |

## Time Values

| Tag | Usual meaning | Reliability notes |
| --- | --- | --- |
| `DateTimeOriginal` | Original image-capture time | Usually the first field to inspect. It often has no time zone. |
| `CreateDate` | Digitization or resource-creation time | Can equal capture time in a camera file. |
| `ModifyDate` | Image-resource modification time | A later value can indicate later processing. |
| `OffsetTimeOriginal` | UTC offset for `DateTimeOriginal` | Makes a capture time less ambiguous. |
| `SubSecTimeOriginal` | Fractional capture seconds | Useful for burst sequence checks. |
| `GPSDateTime` | UTC time from GPS | Compare it with local capture time. |
| `DateCreated` | IPTC or Photoshop content-creation date | Can preserve the original content date through editing. |
| `XMP:CreateDate` | Resource-creation time | Does not mean filesystem creation time.[^4] |
| `XMP:ModifyDate` | Last resource-modification time | Normally set before the file is saved.[^4] |
| `XMP:MetadataDate` | Last metadata-change time | Should be equal to or later than `XMP:ModifyDate`.[^4] |
| `HistoryWhen` | Time of each XMP history event | Read it with the matching action and software agent. |
| `FileCreateDate`, `FileModifyDate` | Times for this filesystem copy | Copy, download, restore, or extraction can replace them. |

For a scan of an analogue photo, capture metadata usually gives the scan time. It does not give the film exposure time unless a person entered it.

## Related Notes

- [[Image Metadata Analysis]]
- [[Image Editing Metadata]]
- [[AI Image Metadata]]

## References

[^1]: [ExifTool EXIF tags and EXIF 3.1 value mappings](https://exiftool.org/TagNames/EXIF.html)
[^2]: [ExifTool Apple MakerNote tags](https://exiftool.org/TagNames/Apple.html)
[^3]: [ExifTool QuickTime tags](https://exiftool.org/TagNames/QuickTime.html)
[^4]: [Adobe XMP Basic namespace](https://developer.adobe.com/xmp/docs/xmp-namespaces/xmp/)
