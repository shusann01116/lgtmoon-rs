import { wasmPath } from '@/lib/wasm'
import { draw_lgtm, initSync } from 'lgtmoon-wasm'
import { useEffect } from 'react'

export function useLgtmoon() {
	useEffect(() => {
		fetch(wasmPath())
			.then((res) => res.arrayBuffer())
			.then((bytes) => initSync({ module: bytes }))
	}, [])

	return (buffer: ArrayBuffer, type: string): Promise<ArrayBuffer> => {
		const raw = draw_lgtm(new Uint8Array(buffer), type)
		return new Blob([raw]).arrayBuffer()
	}
}
