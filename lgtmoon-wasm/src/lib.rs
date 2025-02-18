use image::{codecs::png, ImageBuffer, ImageEncoder, Rgb};
use lgtmoon_core::Drawer;
use wasm_bindgen::{prelude::*, Clamped};
use web_sys::{js_sys::Uint8Array, Blob};

#[wasm_bindgen]
pub fn draw_lgtm(bytes: &Uint8Array) -> Blob {
    console_error_panic_hook::set_once();
    let image = image::load_from_memory(&bytes.to_vec()).expect("failed to load image");
    JsValue::from(Clamped::<Box<[u8]>>(
        draw_lgtm_inner(&image.into_rgb8()).into_boxed_slice(),
    ))
    .into()
}

fn draw_lgtm_inner(image: &ImageBuffer<Rgb<u8>, Vec<u8>>) -> Vec<u8> {
    let drawer = Drawer::default();
    let image_buff = drawer.draw_lgtm(image);
    encode_to_png(&image_buff)
}

fn encode_to_png(image: &ImageBuffer<Rgb<u8>, Vec<u8>>) -> Vec<u8> {
    let mut buff = Vec::new();
    png::PngEncoder::new(&mut buff)
        .write_image(
            image.as_raw(),
            image.width(),
            image.height(),
            image::ExtendedColorType::Rgb8,
        )
        .expect("failed to encode png");
    buff
}
