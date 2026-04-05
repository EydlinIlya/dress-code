"use client";

import { useCallback } from "react";
import { Crosshair } from "lucide-react";

interface ImageCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onSample: (clientX: number, clientY: number) => void;
  hasSampled: boolean;
}

export function ImageCanvas({ canvasRef, onSample, hasSampled }: ImageCanvasProps) {
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
    <div className="space-y-3">
      {!hasSampled && (
        <div className="flex items-center gap-3 px-5 py-4 bg-primary-container rounded-2xl animate-fade-in-up">
          <Crosshair className="h-5 w-5 text-on-primary-container shrink-0" />
          <span className="text-sm font-semibold text-on-primary-container">
            Tap or click on your outfit to check the color
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onTouchEnd={handleTouch}
        className="max-w-full rounded-2xl cursor-crosshair border border-outline-variant/20 mx-auto block shadow-sm"
      />

      {hasSampled && (
        <p className="text-xs text-on-surface-variant/60 text-center">
          Tap a different spot to re-check
        </p>
      )}
    </div>
  );
}
