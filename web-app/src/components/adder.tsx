'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as lgtm from "@/../pkg/lgtmoon_wasm";

export const Adder = dynamic(() => Promise.resolve(Component), { ssr: false })

const Component = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('@/../pkg/lgtmoon_wasm_bg.wasm').then(res => res.arrayBuffer()).then(bytes => lgtm.initSync(bytes))
    console.log("wasm loaded")
  }, [])

  return (
    <div>
      <button onClick={() => {
        const result = lgtm.add(count, 1);
        setCount(result);
      }}>Add</button>
      <p>{count}</p>
    </div>
  )
}