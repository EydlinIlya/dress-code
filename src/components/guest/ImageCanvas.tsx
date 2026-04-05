"use client";

import { useCallback } from "react";

interface ImageCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onSample: (clientX: number, clientY: number) => void;
}

export function ImageCanvas({ canvasRef, onSample }: ImageCanvasProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      onSample(e.clientX, e.clientY);
    },
    [onSample]
  );

  const handleTouch = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      if (touch) {
        onSample(touch.clientX, touch.clientY);
      }
    },
    [onSample]
  );

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onTouchEnd={handleTouch}
        className="max-w-full rounded-2xl cursor-crosshair border border-outline-variant/20 mx-auto block shadow-sm"
      />
      <p className="text-xs text-on-surface-variant/60 text-center mt-3">
        Tap or click on your outfit to sample its color
      </p>
    </div>
  );
}
