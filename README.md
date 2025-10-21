# lgtmoon-rs

WASM を触ってみたいというだけの理由で作った LGTMoon クローン

ファイル選択したら LGTM を描いてくれる、ローカルストレージに保存しておけるので好きな画像をいつでも召喚できるよ

![image](https://github.com/user-attachments/assets/4ac25e9e-9751-44b7-91d8-28536b59c3a6)

## サポートしている画像フォーマット

- PNG
- JPEG/JPG
- GIF (アニメーションGIFは最初のフレームのみ処理されます)
- WebP
- BMP
- TIFF
- ICO

## とりあえず動かしたいだけの場合

[mise](https://mise.jdx.dev/getting-started.html) をインストールしていることが前提だよ

```bash
mise install
pnpm install
pnpm build:wasm
pnpm dev
```

Rust のコードを変えた場合、 `pnpm build:wasm` で再ビルドしてください。
