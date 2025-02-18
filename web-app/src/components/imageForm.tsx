'use client';

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react"
import * as lgtm from "@/../pkg/lgtmoon_wasm";
import { cn } from "@/lib/util";

const Component = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const imageName = useRef("");
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    fetch('/pkg/lgtmoon_wasm_bg.wasm').then(res => res.arrayBuffer()).then(bytes => lgtm.initSync({ module: bytes }))
  }, []);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!imgRef?.current) return;
    setShowImage(true);

    // 選択されたイメージの読み込み
    imgRef.current.src = URL.createObjectURL(file);
    imgRef.current.onload = async () => {
      if (!imgRef.current) return;
      if (imgRef.current) {
        URL.revokeObjectURL(imgRef.current.src);
      }

      // LGTMイメージがレンダリングされていたら終了
      if (imageName.current === imgRef.current.src) return;

      // LGTMイメージのレンダリングをする
      const buffer = await file.arrayBuffer();
      const raw = lgtm.draw_lgtm(new Uint8Array(buffer));
      imgRef.current.src = URL.createObjectURL(new Blob([raw]));
      imageName.current = imgRef.current.src;
    }
  }

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        aria-label="Image file selector"
        onChange={onChange}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        className={cn("max-w-md", showImage ? "" : "hidden")}
        alt="Selected image preview"
      />
    </div>
  )
}

export const ImageForm = dynamic(() => Promise.resolve(Component), { ssr: false })
