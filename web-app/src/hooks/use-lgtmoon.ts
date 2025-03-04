// biome-ignore lint/style/noNamespaceImport: wasm からのインポートのため
import * as lgtm from '@/../pkg/lgtmoon_wasm'
import { wasmPath } from '@/lib/wasm'
import { useEffect } from 'react'

export function useLgtmoon() {
	useEffect(() => {
		fetch(wasmPath())
			.then((res) => res.arrayBuffer())
			.then((bytes) => lgtm.initSync({ module: bytes }))
	}, [])

	return (buffer: ArrayBuffer, type: string): Promise<ArrayBuffer> => {
		const raw = lgtm.drawLgtm(new Uint8Array(buffer), type)
		return new Blob([raw]).arrayBuffer()
	}
}
