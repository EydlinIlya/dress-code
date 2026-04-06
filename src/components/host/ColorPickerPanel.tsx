"use client";

import { useState, useCallback, useRef } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Pipette, Plus, Image, Palette, AlertCircle } from "lucide-react";
import { useEyeDropper } from "@/hooks/useEyeDropper";
import { useCanvasSampler } from "@/hooks/useCanvasSampler";
import { isValidHex } from "@/lib/colors";
import { MAX_COLORS } from "@/lib/constants";

const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".bmp"];
const ACCEPTED_DISPLAY = "JPEG, PNG, WebP, GIF, SVG";

function looksLikeImageUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    const path = u.pathname.toLowerCase();
    return ACCEPTED_EXTENSIONS.some((ext) => path.endsWith(ext));
  } catch {
    return false;
  }
}

function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

interface ColorPickerPanelProps {
  colors: string[];
  onAddColor: (color: string) => void;
}

type Mode = "wheel" | "image";

export function ColorPickerPanel({ colors, onAddColor }: ColorPickerPanelProps) {
  const [currentColor, setCurrentColor] = useState("#e05a8d");
  const [mode, setMode] = useState<Mode>("wheel");
  const { supported: eyeDropperSupported, pickColor } = useEyeDropper();

  // Image mode state
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const { canvasRef, sampledPoint, loadImage, sampleAt } = useCanvasSampler();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (colors.length >= MAX_COLORS) return;
    const hex = currentColor.startsWith("#") ? currentColor : `#${currentColor}`;
    if (!isValidHex(hex)) return;
    onAddColor(hex.toLowerCase());
  };

  const handleEyeDropper = async () => {
    const color = await pickColor();
    if (color) {
      setCurrentColor(color);
    }
  };

  const handleLoadImage = useCallback(() => {
    const url = imageUrl.trim();
    if (!url) return;

    if (!isValidUrl(url)) {
      setImageError("Please enter a valid URL.");
      return;
    }

    if (!looksLikeImageUrl(url)) {
      setImageError(`URL doesn\u2019t look like an image. Supported: ${ACCEPTED_DISPLAY}`);
      return;
    }

    setImageError(null);
    setImageReady(false);

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadImage(url);
      setImageReady(true);
    };
    img.onerror = () => {
      setImageError("Couldn\u2019t load this image. Check the URL or try a different one.");
    };
    img.src = url;
  }, [imageUrl, loadImage]);

  const handleImageUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLoadImage();
  };

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      sampleAt(e.clientX, e.clientY);
    },
    [sampleAt]
  );

  const handleCanvasTouch = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      if (touch) sampleAt(touch.clientX, touch.clientY);
    },
    [sampleAt]
  );

  // Sync sampled color to currentColor
  const sampledColor = sampledPoint?.color;
  if (sampledColor && sampledColor !== currentColor && mode === "image") {
    setCurrentColor(sampledColor);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Mode toggle */}
      <div className="flex bg-surface-high rounded-xl p-1 gap-1">
        <button
          onClick={() => setMode("wheel")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${mode === "wheel" ? "bg-surface-lowest shadow-sm text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
        >
          <Palette className="h-4 w-4" />
          Color Wheel
        </button>
        <button
          onClick={() => setMode("image")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${mode === "image" ? "bg-surface-lowest shadow-sm text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
        >
          <Image className="h-4 w-4" />
          From Image
        </button>
      </div>

      {mode === "wheel" ? (
        <>
          <div className="w-full rounded-2xl shadow-sm overflow-hidden">
            <HexColorPicker
              color={currentColor}
              onChange={setCurrentColor}
              style={{ width: "100%", height: "240px" }}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <label className="absolute -top-2.5 left-4 bg-surface-low px-1.5 text-[10px] uppercase font-bold tracking-wider text-primary z-10">
                Hex Code
              </label>
              <div className="flex items-center bg-surface-lowest rounded-xl py-3.5 px-4 border border-outline-variant/20">
                <span className="text-on-surface-variant text-sm mr-1">#</span>
                <HexColorInput
                  color={currentColor}
                  onChange={setCurrentColor}
                  className="flex-1 bg-transparent text-sm outline-none uppercase font-mono text-on-surface"
                  prefixed={false}
                />
              </div>
            </div>

            {eyeDropperSupported && (
              <button
                onClick={handleEyeDropper}
                className="w-14 h-14 flex items-center justify-center rounded-xl border border-outline-variant/20 bg-surface-lowest text-on-surface-variant hover:bg-surface-high transition-colors shrink-0"
                title="Pick color from screen"
              >
                <Pipette className="h-5 w-5" />
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Image URL input */}
          <div>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="url"
                value={imageUrl}
                onChange={(e) => { setImageUrl(e.target.value); setImageError(null); }}
                onKeyDown={handleImageUrlKeyDown}
                placeholder="Paste image URL…"
                className="flex-1 bg-surface-lowest rounded-xl py-3 px-4 text-sm text-on-surface border border-outline-variant/20 outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-on-surface-variant/40"
              />
              <button
                onClick={handleLoadImage}
                className="soul-gradient text-on-primary font-semibold py-3 px-5 rounded-xl hover:opacity-90 active:scale-95 transition-all shrink-0"
              >
                Load
              </button>
            </div>
            <p className="text-[10px] text-on-surface-variant/50 mt-2 px-1">
              {ACCEPTED_DISPLAY}
            </p>
            {imageError && (
              <div className="flex items-start gap-2 mt-2 px-1">
                <AlertCircle className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                <p className="text-xs text-secondary">{imageError}</p>
              </div>
            )}
          </div>

          {/* Canvas */}
          {imageReady && (
            <div>
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                onTouchEnd={handleCanvasTouch}
                className="max-w-full rounded-2xl cursor-crosshair border border-outline-variant/20 mx-auto block shadow-sm"
              />
              <p className="text-[10px] text-on-surface-variant/50 text-center mt-2">
                {sampledPoint ? "Click another spot to re-pick" : "Click on the image to pick a color"}
              </p>
            </div>
          )}

          {/* Show sampled color preview */}
          {sampledPoint && (
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl shadow-sm border border-outline-variant/20"
                style={{ backgroundColor: sampledPoint.color }}
              />
              <span className="font-mono text-sm text-on-surface uppercase">{sampledPoint.color}</span>
            </div>
          )}
        </>
      )}

      <button
        onClick={handleAdd}
        disabled={colors.length >= MAX_COLORS}
        className="w-full soul-gradient text-on-primary h-14 flex items-center justify-center gap-2 rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 font-semibold"
      >
        <Plus className="h-5 w-5" />
        Add Color
      </button>
    </div>
  );
}
