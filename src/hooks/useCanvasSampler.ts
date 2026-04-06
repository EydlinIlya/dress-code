"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { SAMPLE_REGION_SIZE } from "@/lib/constants";
import { rgbToHex } from "@/lib/colors";
import type { SampledPoint } from "@/types";

export function useCanvasSampler() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sampledPoint, setSampledPoint] = useState<SampledPoint | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [samplingBlocked, setSamplingBlocked] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const drawToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement;
    const maxWidth = container?.clientWidth ?? 600;
    const maxHeight = 500;

    const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    imageRef.current = img;
    setImageLoaded(true);
    setSampledPoint(null);
    setSamplingBlocked(false);
  }, []);

  const loadImage = useCallback((src: string) => {
    const isRemote = src.startsWith("http");

    if (isRemote) {
      // Try with CORS first so canvas isn't tainted
      const corsImg = new Image();
      corsImg.crossOrigin = "anonymous";
      corsImg.onload = () => drawToCanvas(corsImg);
      corsImg.onerror = () => {
        // CORS failed — load without (canvas will be tainted)
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          drawToCanvas(fallbackImg);
          setSamplingBlocked(true);
        };
        fallbackImg.onerror = () => setImageLoaded(false);
        fallbackImg.src = src;
      };
      corsImg.src = src;
    } else {
      const img = new Image();
      img.onload = () => drawToCanvas(img);
      img.onerror = () => setImageLoaded(false);
      img.src = src;
    }
  }, [drawToCanvas]);

  const sampleAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = Math.round((clientX - rect.left) * scaleX);
      const y = Math.round((clientY - rect.top) * scaleY);

      const half = Math.floor(SAMPLE_REGION_SIZE / 2);
      const sx = Math.max(0, x - half);
      const sy = Math.max(0, y - half);
      const sw = Math.min(SAMPLE_REGION_SIZE, canvas.width - sx);
      const sh = Math.min(SAMPLE_REGION_SIZE, canvas.height - sy);

      try {
        const imageData = ctx.getImageData(sx, sy, sw, sh).data;
        const pixelCount = (sw * sh) || 1;
        let r = 0,
          g = 0,
          b = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
        }
        r = Math.round(r / pixelCount);
        g = Math.round(g / pixelCount);
        b = Math.round(b / pixelCount);

        const color = rgbToHex(r, g, b);
        setSampledPoint({ x, y, color });
      } catch {
        // SecurityError — tainted canvas from cross-origin image
        setSamplingBlocked(true);
      }
    },
    []
  );

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    if (sampledPoint) {
      ctx.beginPath();
      ctx.arc(sampledPoint.x, sampledPoint.y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sampledPoint.x, sampledPoint.y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [sampledPoint]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  return {
    canvasRef,
    sampledPoint,
    imageLoaded,
    samplingBlocked,
    loadImage,
    sampleAt,
    setSampledPoint,
  };
}
