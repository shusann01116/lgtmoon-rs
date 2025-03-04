import { env } from '@/config/env'

export function wasmPath() {
	return env.NEXT_PUBLIC_LGTM_WASM_PATH
}
