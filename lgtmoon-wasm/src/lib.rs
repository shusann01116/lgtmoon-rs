use image::{codecs::jpeg::JpegEncoder, ImageBuffer, ImageFormat, Rgb};
use lgtmoon_core::Drawer;
use wasm_bindgen::{prelude::*, Clamped};
use web_sys::{js_sys::Uint8Array, Blob};

#[wasm_bindgen]
pub fn draw_lgtm(bytes: &Uint8Array, mime_type: &str) -> Blob {
    console_error_panic_hook::set_once();
    let format = ImageFormat::from_mime_type(mime_type).expect("failed to get image format");
    let image =
        image::load_from_memory_with_format(&bytes.to_vec(), format).expect("failed to load image");
    JsValue::from(Clamped::<Box<[u8]>>(
        draw_lgtm_inner(&image.into_rgb8()).into_boxed_slice(),
    ))
    .into()
}

fn draw_lgtm_inner(image: &ImageBuffer<Rgb<u8>, Vec<u8>>) -> Vec<u8> {
    let drawer = Drawer::default();
    let image_buff = drawer.draw_lgtm(image);
    let mut bytes: Vec<_> = Vec::new();
    let encoder = JpegEncoder::new_with_quality(&mut bytes, 80);
    image_buff.write_with_encoder(encoder).unwrap();
    bytes
}
