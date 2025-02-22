import * as lgtm from "@/../pkg/lgtmoon_wasm";
import { wasmPath } from "@/lib/wasm";
import { useEffect } from "react";

export function useLgtmoon() {
	useEffect(() => {
		fetch(wasmPath())
			.then((res) => res.arrayBuffer())
			.then((bytes) => lgtm.initSync({ module: bytes }));
	}, []);

	return async (file: File) => {
		const buffer = await file.arrayBuffer();
		const raw = lgtm.draw_lgtm(new Uint8Array(buffer), file.type);
		return new Blob([raw]);
	};
}
