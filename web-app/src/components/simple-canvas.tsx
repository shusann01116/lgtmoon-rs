'use client';

import { useRef } from "react"

export function SimpleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 100, 100);
  }

  const reset = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <div>
      <button onClick={draw}>draw</button>
      <button onClick={reset}>reset</button>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}