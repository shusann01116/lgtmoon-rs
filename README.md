# lgtmoon-rs

WASM を触ってみたいというだけの理由で作った LGTMoon クローン

ファイル選択したら LGTM を描いてくれる、ローカルストレージに保存しておけるので好きな画像をいつでも召喚できるよ

<img width="773" alt="image" src="https://github.com/user-attachments/assets/445d091f-e567-4385-991c-de740663dd82" />


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
