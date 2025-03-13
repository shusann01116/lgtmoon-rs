import { drawLgtm, initSync } from '@/../../lgtmoon-wasm/pkg'
import { wasmPath } from '@/lib/wasm'
import { useEffect } from 'react'

export function useLgtmoon() {
	useEffect(() => {
		fetch(wasmPath())
			.then((res) => res.arrayBuffer())
			.then((bytes) => initSync({ module: bytes }))
	}, [])

	return (buffer: ArrayBuffer, type: string): Promise<ArrayBuffer> => {
		const raw = drawLgtm(new Uint8Array(buffer), type)
		return new Blob([raw]).arrayBuffer()
	}
}
