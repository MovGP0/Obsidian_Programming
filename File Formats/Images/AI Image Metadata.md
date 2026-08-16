---
title: "AI Image Metadata"
---
AI metadata is useful positive evidence when it names a generator, model, prompt, workflow, or AI source type. Its absence is not evidence that AI was not used.

## IPTC Digital Source Type

`XMP-iptcExt:DigitalSourceType` can contain a complete IPTC URI. A C2PA action or ingredient can contain the same URI as `digitalSourceType`. The current controlled values are:[^1]

| ID suffix | Current meaning | Interpretation |
| --- | --- | --- |
| `digitalCapture` | Digital capture sampled from real life | One camera or recording device captured a real-life source. |
| `computationalCapture` | Multi-frame computational capture sampled from real life | A camera or phone merged captured frames without generative AI. |
| `negativeFilm` | Digitized from transparent negative | A scanner digitized a film negative. |
| `positiveFilm` | Digitized from transparent positive | A scanner digitized a slide or positive film. |
| `print` | Digitized from non-transparent medium | A scanner or camera digitized a print or similar medium. |
| `humanEdits` | Human-edited media | A person used non-generative tools to alter, correct, or enhance media. |
| `algorithmicallyEnhanced` | Algorithmically altered media | A human started or configured a non-generative operation, such as noise reduction. |
| `digitalCreation` | Digital creation | A person created media with non-generative digital tools. |
| `dataDrivenMedia` | Data-driven media | Software represents data through human programming or creative choices. |
| `trainedAlgorithmicMedia` | Created using generative AI | A trained AI model created the media. This is the main positive AI-generation value. |
| `algorithmicMedia` | Pure algorithmic media | An algorithm created media without a model trained on captured content. |
| `screenCapture` | Screen capture | A device captured screen contents. |
| `virtualRecording` | Virtual event recording | A recording of a virtual event that can contain captured or generated elements. |
| `composite` | Composite of elements | A general composite whose elements can have different source types. |
| `compositeCapture` | Composite of captured elements | All combined elements are captures of real life. |
| `compositeSynthetic` | Composite including generative-AI elements | At least one combined element is generative AI. |
| `compositeWithTrainedAlgorithmicMedia` | Edited using generative AI | Generative AI augmented or changed media, such as through inpainting. |

The complete value has this form:

```text
http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia
```

Legacy files can contain retired values:

| Retired ID | Use instead |
| --- | --- |
| `minorHumanEdits` | `humanEdits` |
| `digitalArt` | `digitalCreation` |
| `softwareImage` | Select a more specific current value. |

An unsigned XMP value is a declaration that anyone can change. The same value in a valid [[C2PA Content Credentials|C2PA]] action is stronger because the signature protects it.

## Common Generator Metadata

| Metadata signature | Likely source | Typical content |
| --- | --- | --- |
| `PNG:Parameters` | AUTOMATIC1111 Stable Diffusion WebUI and compatible tools | Prompt, negative prompt, steps, sampler, CFG scale, seed, size, model hash, and model name. The WebUI can disable this metadata.[^2] |
| PNG text keys `prompt` and `workflow` | ComfyUI | JSON prompt data and the node workflow. ComfyUI normally saves the workflow in image metadata.[^3] |
| Prompt, seed, and settings in PNG text or comments | NovelAI | NovelAI generation data. The normal download action preserves it, but some copy and save paths do not.[^4] |
| Rich prompt or workflow JSON | InvokeAI | Prompt, model, seed, and workflow data. Exact key names vary by version. |
| `Software` or `CreatorTool` containing `Stable Diffusion`, `ComfyUI`, `InvokeAI`, or `NovelAI` | Local AI pipeline | Positive software evidence when present. |
| `Software`, `CreatorTool`, or comment containing `Midjourney`, `DALL-E`, `Adobe Firefly`, `OpenAI`, or another service | Cloud AI pipeline | Positive free-text evidence when present. Export behavior can change. |
| C2PA `softwareAgent` containing a generator name | Signed generator pipeline | Read it with the action, source type, signer, and validation result. |
| C2PA `digitalSourceType = .../trainedAlgorithmicMedia` | C2PA generator manifest | Declares full AI generation. |
| C2PA `digitalSourceType = .../compositeWithTrainedAlgorithmicMedia` | C2PA editing manifest | Declares generative-AI editing. |

For AUTOMATIC1111 output, look for these value fragments:

```text
Negative prompt:
Steps:
Sampler:
CFG scale:
Seed:
Model hash:
Model:
Denoising strength:
Hires upscale:
```

These fields are strong positive evidence of a generation workflow. They are not cryptographically protected. A person can remove or copy them.

## Search Command

```powershell
exiftool -a -u -G1 -s '.\photo.png' |
    Select-String -Pattern '(?i)prompt|negative prompt|workflow|seed|sampler|cfg scale|model|stable diffusion|comfy|fooocus|invoke|novelai|midjourney|firefly|openai|dall|trainedalgorithmicmedia|compositewithtrainedalgorithmicmedia'
```

## Negative Results Are Weak

```text
Camera EXIF present  != proof of a camera original
Camera EXIF absent   != proof of AI generation
AI metadata present  = useful positive evidence
AI metadata absent   != evidence against AI generation
```

AI services, social platforms, screenshots, and converters can remove metadata. A person can also copy camera metadata to an AI-generated image.

## Related Notes

- [[Image Metadata Analysis]]
- [[Image Capture Metadata]]
- [[Image Editing Metadata]]
- [[C2PA Content Credentials]]

## References

[^1]: [IPTC Digital Source Type controlled vocabulary](https://www.iptc.org/std-dev/NewsCodes/treeview/digitalsourcetype-en-GB.html)
[^2]: [AUTOMATIC1111 PNG metadata](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#png-info)
[^3]: [ComfyUI workflow metadata](https://docs.comfy.org/development/core-concepts/workflow)
[^4]: [NovelAI image metadata guidance](https://docs.novelai.net/en/faq/)
