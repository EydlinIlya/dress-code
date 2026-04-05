"use client";

import { useCallback, useRef, useState } from "react";
import { Crosshair } from "lucide-react";

interface ImageCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onSample: (clientX: number, clientY: number) => void;
  hasSampled: boolean;
}

interface LoupeState {
  visible: boolean;
  // Position on the canvas element (CSS pixels)
  canvasX: number;
  canvasY: number;
  // Position on viewport for the loupe popup
  screenX: number;
  screenY: number;
}

const LOUPE_SIZE = 120;
const LOUPE_ZOOM = 4;

export function ImageCanvas({ canvasRef, onSample, hasSampled }: ImageCanvasProps) {
  const loupeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [loupe, setLoupe] = useState<LoupeState>({
    visible: false, canvasX: 0, canvasY: 0, screenX: 0, screenY: 0,
  });

  const drawLoupe = useCallback(
    (canvasX: number, canvasY: number) => {
      const canvas = canvasRef.current;
      const loupeCanvas = loupeCanvasRef.current;
      if (!canvas || !loupeCanvas) return;

      const ctx = canvas.getContext("2d");
      const loupeCtx = loupeCanvas.getContext("2d");
      if (!ctx || !loupeCtx) return;

      loupeCanvas.width = LOUPE_SIZE;
      loupeCanvas.height = LOUPE_SIZE;

      // Source region on the main canvas (in canvas pixels)
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const srcX = canvasX * scaleX;
      const srcY = canvasY * scaleY;
      const srcSize = LOUPE_SIZE / LOUPE_ZOOM;

      loupeCtx.imageSmoothingEnabled = false;
      loupeCtx.drawImage(
        canvas,
        srcX - srcSize / 2, srcY - srcSize / 2, srcSize, srcSize,
        0, 0, LOUPE_SIZE, LOUPE_SIZE
      );

      // Draw crosshair in center
      const center = LOUPE_SIZE / 2;
      loupeCtx.strokeStyle = "white";
      loupeCtx.lineWidth = 2;
      loupeCtx.beginPath();
      loupeCtx.arc(center, center, 8, 0, Math.PI * 2);
      loupeCtx.stroke();
      loupeCtx.strokeStyle = "black";
      loupeCtx.lineWidth = 1;
      loupeCtx.beginPath();
      loupeCtx.arc(center, center, 8, 0, Math.PI * 2);
      loupeCtx.stroke();
    },
    [canvasRef]
  );

  const getCanvasPos = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return { canvasX: 0, canvasY: 0 };
      const rect = canvas.getBoundingClientRect();
      return {
        canvasX: clientX - rect.left,
        canvasY: clientY - rect.top,
      };
    },
    [canvasRef]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      onSample(e.clientX, e.clientY);
    },
    [onSample]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      const { canvasX, canvasY } = getCanvasPos(touch.clientX, touch.clientY);
      setLoupe({ visible: true, canvasX, canvasY, screenX: touch.clientX, screenY: touch.clientY });
      drawLoupe(canvasX, canvasY);
    },
    [getCanvasPos, drawLoupe]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      const { canvasX, canvasY } = getCanvasPos(touch.clientX, touch.clientY);
      setLoupe({ visible: true, canvasX, canvasY, screenX: touch.clientX, screenY: touch.clientY });
      drawLoupe(canvasX, canvasY);
    },
    [getCanvasPos, drawLoupe]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      setLoupe((prev) => ({ ...prev, visible: false }));
      const touch = e.changedTouches[0];
      if (touch) {
        onSample(touch.clientX, touch.clientY);
      }
    },
    [onSample]
  );

  // Position loupe above the finger
  const loupeStyle: React.CSSProperties = loupe.visible
    ? {
        position: "fixed",
        left: loupe.screenX - LOUPE_SIZE / 2,
        top: loupe.screenY - LOUPE_SIZE - 30,
        width: LOUPE_SIZE,
        height: LOUPE_SIZE,
        pointerEvents: "none",
        zIndex: 50,
      }
    : { display: "none" };

  return (
    <div className="space-y-3">
      {!hasSampled && (
        <div className="flex items-center gap-3 px-5 py-4 bg-primary-container rounded-2xl animate-fade-in-up">
          <Crosshair className="h-5 w-5 text-on-primary-container shrink-0" />
          <span className="text-sm font-semibold text-on-primary-container">
            Tap and hold to zoom in, release to pick the color
          </span>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="max-w-full rounded-2xl cursor-crosshair border border-outline-variant/20 mx-auto block shadow-sm touch-none"
        />

        {/* Zoom loupe */}
        <canvas
          ref={loupeCanvasRef}
          style={loupeStyle}
          className="rounded-full border-4 border-white shadow-xl"
        />
      </div>

      {hasSampled && (
        <p className="text-xs text-on-surface-variant/60 text-center">
          Tap and hold to zoom, release to re-check
        </p>
      )}
    </div>
  );
}
