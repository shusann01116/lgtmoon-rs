import * as lgtm from "@/../pkg/lgtmoon_wasm";
import { wasmPath } from "@/utils/wasm";
import { type RefObject, useEffect, useRef } from "react";

export function useLgtmoon(ref: RefObject<HTMLImageElement | null>) {
	useEffect(() => {
		fetch(wasmPath())
			.then((res) => res.arrayBuffer())
			.then((bytes) => lgtm.initSync({ module: bytes }));
	}, []);

	const imageName = useRef("");

	return (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!ref?.current) return;

		// 選択されたイメージの読み込み
		ref.current.src = URL.createObjectURL(file);
		ref.current.onload = async () => {
			if (!ref.current) return;

			// LGTMイメージがレンダリングされていたら終了
			if (imageName.current === ref.current.src) return;

			// LGTMイメージのレンダリングをする
			const buffer = await file.arrayBuffer();
			const raw = lgtm.draw_lgtm(new Uint8Array(buffer));
			ref.current.src = URL.createObjectURL(new Blob([raw]));
			imageName.current = ref.current.src;
		};
	};
}
