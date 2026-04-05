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
        className="max-w-full rounded-lg cursor-crosshair border mx-auto block"
      />
      <p className="text-xs text-muted-foreground text-center mt-2">
        Tap or click on your outfit to sample its color
      </p>
    </div>
  );
}
