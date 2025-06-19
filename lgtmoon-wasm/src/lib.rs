use image::{
    codecs::{jpeg::JpegEncoder, png::PngEncoder, webp::WebPEncoder},
    DynamicImage, ImageBuffer, ImageFormat, Rgb,
};
use lgtmoon_core::Drawer;
use wasm_bindgen::{prelude::*, Clamped};
use web_sys::{js_sys::Uint8Array, Blob};

#[wasm_bindgen(js_name = "drawLgtm")]
pub fn draw_lgtm(bytes: &Uint8Array, mime_type: &str) -> Blob {
    console_error_panic_hook::set_once();
    let format = ImageFormat::from_mime_type(mime_type).expect("failed to get image format");
    let image =
        image::load_from_memory_with_format(&bytes.to_vec(), format).expect("failed to load image");
    JsValue::from(Clamped::<Box<[u8]>>(
        draw_lgtm_inner(&image.into_rgb8(), format).into_boxed_slice(),
    ))
    .into()
}

fn draw_lgtm_inner(image: &ImageBuffer<Rgb<u8>, Vec<u8>>, format: ImageFormat) -> Vec<u8> {
    let drawer = Drawer::default();
    let image_buff = drawer.draw_lgtm(image);
    let mut bytes: Vec<_> = Vec::new();

    match format {
        ImageFormat::Png => {
            let encoder = PngEncoder::new(&mut bytes);
            image_buff.write_with_encoder(encoder).unwrap();
        }
        ImageFormat::Jpeg => {
            let encoder = JpegEncoder::new_with_quality(&mut bytes, 80);
            image_buff.write_with_encoder(encoder).unwrap();
        }
        ImageFormat::Gif => {
            // GIF uses DynamicImage save method since GifEncoder doesn't implement ImageEncoder
            let dynamic_img = DynamicImage::ImageRgb8(image_buff);
            let mut cursor = std::io::Cursor::new(&mut bytes);
            dynamic_img.write_to(&mut cursor, format).unwrap();
        }
        ImageFormat::WebP => {
            let encoder = WebPEncoder::new_lossless(&mut bytes);
            image_buff.write_with_encoder(encoder).unwrap();
        }
        _ => {
            // Fallback to JPEG for unsupported formats
            let encoder = JpegEncoder::new_with_quality(&mut bytes, 80);
            image_buff.write_with_encoder(encoder).unwrap();
        }
    }

    bytes
}
