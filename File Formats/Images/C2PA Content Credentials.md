---
title: "C2PA Content Credentials"
---
Coalition for Content Provenance and Authenticity (**C2PA**) Content Credentials store signed provenance assertions in a manifest. The signature binds the manifest to the asset.

> [!IMPORTANT]
> C2PA does not sign ordinary EXIF or XMP as a separate universal metadata signature. It signs a C2PA claim that contains assertions and an asset binding. The claim can describe capture, editing, metadata changes, ingredients, and AI use.

## Important Fields

| Field | Use |
| --- | --- |
| `claim_generator` or claim-generator information | Identifies the application that created the manifest. |
| `softwareAgent` | Identifies hardware or software that performed an action. |
| `action` | Identifies creation, editing, cropping, placement, or another operation. |
| `digitalSourceType` | Declares capture, AI generation, AI editing, or another source type. |
| `when` | Records an action time. It is normally self-declared. A trusted timestamp adds stronger time evidence. |
| `ingredients` | Identifies parent or component assets and their relationships. |
| `signature_info` | Gives certificate and timestamp information. |
| `validation_status`, `validationResults` | Reports binding, signature, certificate, or ingredient problems. |

## Image-Relevant Action Values

The current specification defines these actions:[^1]

| Action | Meaning |
| --- | --- |
| `c2pa.created` | Asset was first created. |
| `c2pa.opened` | An existing parent asset was opened for editing. |
| `c2pa.edited` | A general editorial change occurred. |
| `c2pa.edited.metadata` | Metadata changed, but digital image content did not. |
| `c2pa.cropped` | Content was cropped out. |
| `c2pa.resized` | Image dimensions changed. |
| `c2pa.adjustedColor` | Tone, color, or saturation changed. |
| `c2pa.enhanced` | Non-editorial enhancement, such as sharpening or noise reduction, occurred. |
| `c2pa.filtered` | A filter or style changed the appearance. |
| `c2pa.drawing` | A brush, eraser, or drawing tool changed the image. |
| `c2pa.addedText` | Visible text was added. |
| `c2pa.placed` | A component ingredient was placed in the asset. |
| `c2pa.deleted` | Image content was deleted. |
| `c2pa.orientation` | Direction or position changed. |
| `c2pa.converted` | File format changed. A more specific conversion action can be preferable. |
| `c2pa.published` | Asset was released to a wider audience. |
| `c2pa.redacted` | An assertion from another manifest was redacted. |
| `c2pa.unknown` | An action occurred, but the generator cannot identify it. |

Read `description`, `parameters`, `softwareAgent`, and `digitalSourceType` with each action.

## Creation Source Values

Common `digitalSourceType` values include:

| Value | Use |
| --- | --- |
| `digitalCapture` | Direct digital camera or recording-device capture. |
| `computationalCapture` | Multi-frame real-life capture with automatic non-generative processing. |
| `digitalCreation` | Human creation with non-generative digital tools. |
| `trainedAlgorithmicMedia` | Full creation by a trained generative-AI model. |
| `compositeWithTrainedAlgorithmicMedia` | Editing or augmentation with generative AI. |

See [[AI Image Metadata]] for the complete source-type list.

## Inspect with ExifTool

ExifTool can extract C2PA and JUMBF data:[^2]

```powershell
exiftool -jumbf:all -G3 -b -j -u -struct '.\photo.jpg'
```

ExifTool extracts the data. It does not replace full signature and trust validation.

## Validate with c2patool

Use the official `c2patool`:[^3]

```powershell
c2patool '.\photo.jpg' --info
c2patool '.\photo.jpg' --tree
c2patool '.\photo.jpg' --detailed
```

To validate the certificate chain against the official trust list:

```powershell
c2patool '.\photo.jpg' trust `
    --trust_anchors 'https://raw.githubusercontent.com/c2pa-org/conformance-public/refs/heads/main/trust-list/C2PA-TRUST-LIST.pem'
```

The trust list can change. Refresh it for a current assessment.

Check each result separately:

1. Is a manifest present?
2. Does the asset binding validate?
3. Does the signature validate?
4. Does the certificate chain lead to a trusted root?
5. Is there a trusted timestamp?
6. Who signed the assertion?
7. What do the actions and source types claim?
8. Do ingredient manifests also validate?

## Create and Sign with c2patool

A manifest definition can contain signer settings for local development:

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

Sign a new non-generative digital creation:

```powershell
c2patool '.\created.jpg' `
    --manifest '.\manifest.json' `
    --output '.\signed.jpg' `
    --create digitalCreation
```

Use `trainedAlgorithmicMedia` instead of `digitalCreation` for a new image made by generative AI. Use a parent ingredient and the edit intent for an edited existing asset. The official CLI can add a parent with `--parent`.[^3]

## Key and Certificate Security

- Do not put production private keys in source control or a distributable application.
- Use a remote signer, hardware security module, or protected signing service for production.
- Keep certificate and private-key algorithms consistent.
- Use certificates that meet the C2PA certificate profile.[^4]
- A self-signed test certificate can test binding and signature code. It is not a trusted production identity.
- Add a trusted timestamp authority when durable time evidence is required.
- Never overwrite the forensic source file. Write the signed result to a new path.

## Trust Limits

A valid manifest proves that the signed assertions and bound content still match. It does not prove that the scene is true. Trust also depends on the signer, certificate policy, stated actions, source types, and ingredient chain.

## Code Examples

- [[Image Metadata with C Sharp]] uses the official `c2patool` because there is no official .NET C2PA SDK in the current SDK list.[^5]
- [[Image Metadata with Rust]] uses the official `c2pa` Rust crate.

## References

[^1]: [C2PA 2.4 action values](https://spec.c2pa.org/specifications/specifications/2.4/specs/ContentCredentials.html#_actions)
[^2]: [ExifTool C2PA and JUMBF tags](https://exiftool.org/TagNames/Jpeg2000.html)
[^3]: [Official c2patool usage](https://github.com/contentauth/c2pa-rs/blob/main/cli/docs/usage.md)
[^4]: [C2PA signing and certificate guidance](https://opensource.contentauthenticity.org/docs/getting-started/c2pa-certificates/)
[^5]: [Content Authenticity Initiative SDK overview](https://opensource.contentauthenticity.org/docs/introduction/)
