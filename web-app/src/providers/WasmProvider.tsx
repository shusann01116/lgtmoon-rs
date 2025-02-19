'use client';

import { wasmPath } from "@/utils/wasm";
import { createContext, useEffect } from "react";
import * as lgtm from "@/../pkg/lgtmoon_wasm";

export const WasmContext = createContext(null);

export default function WasmProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    fetch(wasmPath())
      .then((res) => res.arrayBuffer())
      .then((bytes) => lgtm.initSync({ module: bytes }));
  }, []);

  return (
    <WasmContext.Provider value={null}>
      {children}
    </WasmContext.Provider>
  )
}
