use std::time::Instant;

use lgtmoon_core::Drawer;

fn main() {
    let drawer = Drawer::default();
    let drawed = drawer.draw_lgtm_by_path("img/tokyotower.jpg");
    let instant = Instant::now();
    drawed.save("img/tokyotower_drawed.png").unwrap();
    println!("save: {:?}", instant.elapsed());
}
