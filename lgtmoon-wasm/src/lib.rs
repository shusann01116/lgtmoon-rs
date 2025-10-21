use image::{codecs::jpeg::JpegEncoder, ImageBuffer, ImageFormat, Rgb};
use lgtmoon_core::Drawer;
use wasm_bindgen::{prelude::*, Clamped};
use web_sys::{js_sys::Uint8Array, Blob};

#[wasm_bindgen(js_name = "drawLgtm")]
pub fn draw_lgtm(bytes: &Uint8Array, mime_type: &str) -> Blob {
    console_error_panic_hook::set_once();

    // Parse image format from MIME type with explicit support for common formats
    let format = parse_image_format(mime_type)
        .unwrap_or_else(|| panic!("Unsupported image format: {}", mime_type));

    let image =
        image::load_from_memory_with_format(&bytes.to_vec(), format)
            .unwrap_or_else(|e| panic!("Failed to load image: {}", e));

    JsValue::from(Clamped::<Box<[u8]>>(
        draw_lgtm_inner(&image.into_rgb8()).into_boxed_slice(),
    ))
    .into()
}

/// Parse MIME type to ImageFormat with explicit support for common formats
fn parse_image_format(mime_type: &str) -> Option<ImageFormat> {
    match mime_type {
        "image/png" => Some(ImageFormat::Png),
        "image/jpeg" | "image/jpg" => Some(ImageFormat::Jpeg),
        "image/gif" => Some(ImageFormat::Gif),
        "image/webp" => Some(ImageFormat::WebP),
        "image/bmp" => Some(ImageFormat::Bmp),
        "image/x-icon" | "image/vnd.microsoft.icon" => Some(ImageFormat::Ico),
        "image/tiff" => Some(ImageFormat::Tiff),
        _ => ImageFormat::from_mime_type(mime_type),
    }
}

fn draw_lgtm_inner(image: &ImageBuffer<Rgb<u8>, Vec<u8>>) -> Vec<u8> {
    let drawer = Drawer::default();
    let image_buff = drawer.draw_lgtm(image);
    let mut bytes: Vec<_> = Vec::new();
    let encoder = JpegEncoder::new_with_quality(&mut bytes, 80);
    image_buff.write_with_encoder(encoder).unwrap();
    bytes
}
