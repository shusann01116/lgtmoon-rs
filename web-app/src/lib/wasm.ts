import { clientEnv } from "@/config/env";

export function wasmPath() {
	return clientEnv.NEXT_PUBLIC_LGTM_WASM_PATH;
}
