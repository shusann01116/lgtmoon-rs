# lgtmoon-rs

WASM を触ってみたいというだけの理由で作った LGTMoon クローン

ファイル選択したら LGTM を描いてくれる、ローカルストレージに保存しておけるので好きな画像をいつでも召喚できるよ

![image](https://github.com/user-attachments/assets/4ac25e9e-9751-44b7-91d8-28536b59c3a6)

## とりあえず動かしたいだけの場合

```bash
cargo install wasm-pack
cd web-app
pnpm install
pnpm build:wasm
pnpm dev
```

Rust のコードを変えた場合、 `pnpm build:wasm` で再ビルドしてください。

## 細かい話 (TBD)
