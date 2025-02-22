# lgtmoon-rs

WASM を触ってみたいというだけの理由で作った LGTMoon クローン

ファイル選択したら LGTM を描いてくれる、ローカルストレージに保存しておけるので好きな画像をいつでも召喚できるよ

![image](https://github.com/user-attachments/assets/76e275a1-1731-4447-a95e-50d175c798ff)

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
