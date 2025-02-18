use ::ab_glyph::{Font, ScaleFont};
use ab_glyph::FontArc;
use glyph_brush_layout::ab_glyph;
use image::{ImageBuffer, Rgb};

#[derive(Debug, Clone, Copy)]
struct TextScale {
    big: f32,
    small: f32,
}

#[derive(Debug, Clone, Copy)]
struct Coordinate(i32, i32);

pub struct Drawer {
    font: FontArc,
}

impl Drawer {
    const LGTM_BIG_TEXT: &str = "L G T M";
    const LGTM_SMALL_TEXT: &str = "Looks  Good  To  Me";
    const TEXT_SCALE_RATIO: f32 = 5.0;
    const LINE_HEIGHT_RATIO: f32 = 1.2;

    pub fn new(font: FontArc) -> Self {
        Self { font }
    }

    pub fn draw_lgtm_by_path(&self, path: &str) -> ImageBuffer<Rgb<u8>, Vec<u8>> {
        let image = image::open(path).unwrap().into_rgb8();
        self.draw_lgtm(&image)
    }

    pub fn draw_lgtm(
        &self,
        image: &ImageBuffer<Rgb<u8>, Vec<u8>>,
    ) -> ImageBuffer<Rgb<u8>, Vec<u8>> {
        let text_scale = self.calc_max_width_point(Self::LGTM_BIG_TEXT, image.dimensions());
        let placement_point = self.calc_placement_point(text_scale, image.dimensions());
        self.draw_text(image, placement_point, text_scale)
    }

    fn draw_text(
        &self,
        image: &ImageBuffer<Rgb<u8>, Vec<u8>>,
        placement_point: (Coordinate, Coordinate),
        text_scale: TextScale,
    ) -> ImageBuffer<Rgb<u8>, Vec<u8>> {
        let image = imageproc::drawing::draw_text(
            image,
            Rgb([255, 255, 255]),
            placement_point.0 .0,
            placement_point.0 .1,
            text_scale.big,
            &self.font,
            Self::LGTM_BIG_TEXT,
        );

        imageproc::drawing::draw_text(
            &image,
            Rgb([255, 255, 255]),
            placement_point.1 .0,
            placement_point.1 .1,
            text_scale.small,
            &self.font,
            Self::LGTM_SMALL_TEXT,
        )
    }

    /// 画像の最大横幅いっぱいに配置するための文字のポイントを返す
    fn calc_max_width_point(&self, text: &str, dimensions: (u32, u32)) -> TextScale {
        let mut big_text_scale = 0.0;
        loop {
            let big_text_size = imageproc::drawing::text_size(big_text_scale, &self.font, text);
            let small_text_size = imageproc::drawing::text_size(
                big_text_scale / Self::TEXT_SCALE_RATIO,
                &self.font,
                text,
            );

            if self.is_exceed_dimensions(big_text_size, dimensions)
                || self.is_exceed_dimensions(small_text_size, dimensions)
            {
                break;
            }

            big_text_scale += 1.0;
        }

        TextScale {
            big: big_text_scale,
            small: big_text_scale / Self::TEXT_SCALE_RATIO,
        }
    }

    fn is_exceed_dimensions(&self, text_size: (u32, u32), dimensions: (u32, u32)) -> bool {
        text_size.0 > dimensions.0 || text_size.1 > dimensions.1
    }

    /// 大きいテキストと小さいテキストそれぞれの配置ポイントを返す
    fn calc_placement_point(
        &self,
        text_scale: TextScale,
        dimensions: (u32, u32),
    ) -> (Coordinate, Coordinate) {
        let image_center_x = dimensions.0 as f32 / 2.0;

        let (big_text_width, big_text_height) =
            self.get_text_box_size(Self::LGTM_BIG_TEXT, text_scale.big);
        let (small_text_width, small_text_height) =
            self.get_text_box_size(Self::LGTM_SMALL_TEXT, text_scale.small);
        let text_box_height = big_text_height * Self::LINE_HEIGHT_RATIO + small_text_height;

        let big_text_coordinates = Coordinate(
            (image_center_x - big_text_width / 2.0) as i32,
            (dimensions.1 as f32 - text_box_height) as i32 / 2,
        );
        let small_text_coordinates = Coordinate(
            (image_center_x - small_text_width / 2.0) as i32,
            big_text_coordinates.1 + (big_text_height * Self::LINE_HEIGHT_RATIO) as i32,
        );

        (big_text_coordinates, small_text_coordinates)
    }

    fn get_text_box_size(&self, text: &str, text_scale: f32) -> (f32, f32) {
        let (width, _) = imageproc::drawing::text_size(text_scale, &self.font, text);
        let height = self.font.as_scaled(text_scale).ascent();

        (width as f32, height)
    }
}

impl Default for Drawer {
    fn default() -> Self {
        Self::new(
            FontArc::try_from_slice(include_bytes!("../../fonts/NotoSans-Regular.ttf")).unwrap(),
        )
    }
}
