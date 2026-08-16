---
title: "Image Metadata with Rust"
---
The `little_exif` crate can read, create, change, and write common EXIF tags. The official `c2pa` crate can read, create, and sign C2PA manifests.[^1][^2]

`little_exif` does not replace ExifTool for full forensic inspection. Its supported formats and tags are narrower, and it does not decode the complete vendor MakerNote ecosystem.

The examples below were checked with Rust 1.96.1, `little_exif` 0.6.23, and `c2pa` 0.90.7.

## Dependencies

```toml
[dependencies]
c2pa = { version = "0.90.7", default-features = false, features = ["file_io", "rust_native_crypto"] }
little_exif = "0.6.23"
serde_json = "1"
```

`rust_native_crypto` avoids a local OpenSSL build for the signing example. Select features that match the security and platform requirements of the application.

## Read, Create, and Change EXIF

```rust
use std::error::Error;
use std::fs;
use std::path::Path;

use little_exif::exif_tag::ExifTag;
use little_exif::metadata::Metadata;

fn main() -> Result<(), Box<dyn Error>> {
    read_exif(Path::new("photo.jpg"))?;
    update_exif(Path::new("photo.jpg"), Path::new("photo-with-metadata.jpg"))?;
    create_exif(Path::new("created.jpg"))?;
    Ok(())
}

fn read_exif(path: &Path) -> Result<(), Box<dyn Error>> {
    let metadata = Metadata::new_from_path(path)?;

    print_tags(&metadata, ExifTag::Make(String::new()), "Make");
    print_tags(&metadata, ExifTag::Model(String::new()), "Model");
    print_tags(
        &metadata,
        ExifTag::DateTimeOriginal(String::new()),
        "Captured",
    );
    print_tags(&metadata, ExifTag::Software(String::new()), "Software");
    Ok(())
}

fn update_exif(input_path: &Path, output_path: &Path) -> Result<(), Box<dyn Error>> {
    fs::copy(input_path, output_path)?;

    let mut metadata = Metadata::new_from_path(output_path)?;
    metadata.set_tag(ExifTag::Software("MetadataExample 1.0".to_owned()));
    metadata.set_tag(ExifTag::Artist("Example Author".to_owned()));
    metadata.write_to_file(output_path)?;
    Ok(())
}

fn create_exif(path: &Path) -> Result<(), Box<dyn Error>> {
    let mut metadata = Metadata::new();
    metadata.set_tag(ExifTag::Software("MetadataExample 1.0".to_owned()));
    metadata.set_tag(ExifTag::ImageDescription("Created image".to_owned()));
    metadata.write_to_file(path)?;
    Ok(())
}

fn print_tags(metadata: &Metadata, tag: ExifTag, label: &str) {
    for value in metadata.get_tag(&tag) {
        println!("{label}: {value:?}");
    }
}
```

`create_exif` creates a new metadata object. The image at `created.jpg` must already exist because `write_to_file` writes metadata into an image file. The method does not create image pixels.[^1]

The update function copies the image before it changes metadata. This preserves the input path, but the output is not forensic evidence. Keep a separate untouched source and hash.

## Create and Sign C2PA Provenance

The C2PA builder creates a manifest, binds it to the output image, and signs it. The output path must not already exist.[^3]

```rust
use std::error::Error;
use std::path::Path;

use c2pa::{
    create_signer, Builder, BuilderIntent, Context, DigitalSourceType, Reader, SigningAlg,
};
use serde_json::json;

fn main() -> Result<(), Box<dyn Error>> {
    sign_new_image(
        Path::new("created.jpg"),
        Path::new("signed.jpg"),
        Path::new("signing/es256_certs.pem"),
        Path::new("signing/es256_private.key"),
    )?;
    Ok(())
}

fn sign_new_image(
    source_path: &Path,
    output_path: &Path,
    certificate_path: &Path,
    private_key_path: &Path,
) -> Result<(), Box<dyn Error>> {
    let signer =
        create_signer::from_files(certificate_path, private_key_path, SigningAlg::Es256, None)?;

    let context = Context::new();
    let mut builder = Builder::from_context(context).with_definition(json!({
        "title": "Created image",
        "claim_generator_info": [
            {
                "name": "MetadataExample",
                "version": "1.0.0"
            }
        ]
    }))?;
    builder.set_intent(BuilderIntent::Create(DigitalSourceType::DigitalCreation));
    builder.sign_file(signer.as_ref(), source_path, output_path)?;

    let reader = Reader::default().with_file(output_path)?;
    println!("{}", reader.json());
    println!("Validation state: {:?}", reader.validation_state());
    Ok(())
}
```

`BuilderIntent::Create` requires a source type and adds creation provenance. Replace `DigitalCreation` with `TrainedAlgorithmicMedia` for a fully AI-generated image. Use `BuilderIntent::Edit` and a parent ingredient for an edited existing asset.[^4]

`Reader::with_file` reads and validates the manifest. A successful read does not guarantee valid provenance. Always inspect the validation state, validation results, signer, and ingredient chain.[^5]

Do not embed production private keys in the binary or repository. Use the `Signer` or `AsyncSigner` interfaces with a protected key service for production.

## Related Notes

- [[Image Metadata Analysis]]
- [[C2PA Content Credentials]]
- [[Image Metadata with C Sharp]]

## References

[^1]: [`little_exif::Metadata` documentation](https://docs.rs/little_exif/latest/little_exif/metadata/struct.Metadata.html)
[^2]: [Official C2PA Rust SDK](https://github.com/contentauth/c2pa-rs)
[^3]: [`c2pa::Builder::sign_file` documentation](https://docs.rs/c2pa/latest/c2pa/struct.Builder.html#method.sign_file)
[^4]: [`c2pa::BuilderIntent` documentation](https://docs.rs/c2pa/latest/c2pa/enum.BuilderIntent.html)
[^5]: [`c2pa::Reader::with_file` documentation](https://docs.rs/c2pa/latest/c2pa/struct.Reader.html#method.with_file)
