# lgtmoon-rs

WASM を触ってみたいというだけの理由で作った LGTMoon クローン

ファイル選択したら LGTM を描いてくれるだけ

<img width="541" alt="image" src="https://github.com/user-attachments/assets/65fc9015-8012-45bf-8143-79f552283d30" />

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
