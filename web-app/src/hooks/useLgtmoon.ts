import * as lgtm from "@/../pkg/lgtmoon_wasm";
import { wasmPath } from "@/lib/wasm";
import { useEffect } from "react";

export function useLgtmoon() {
	useEffect(() => {
		fetch(wasmPath())
			.then((res) => res.arrayBuffer())
			.then((bytes) => lgtm.initSync({ module: bytes }));
	}, []);

	return async (buffer: ArrayBuffer, type: string): Promise<ArrayBuffer> => {
		const raw = lgtm.draw_lgtm(new Uint8Array(buffer), type);
		return new Blob([raw]).arrayBuffer();
	};
}
