import { basePath } from '@/lib/env';

const wasmRelativePath = '/pkg/lgtmoon_wasm_bg.wasm';
export function wasmPath() {
  return basePath + wasmRelativePath;
}
