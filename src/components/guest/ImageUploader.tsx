"use client";

import { useCallback, useRef, useState } from "react";
import { ImageIcon, Camera, Link, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  onLoadUrl: (url: string) => void;
}

export function ImageUploader({ onUpload, onLoadUrl }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [urlLoading, setUrlLoading] = useState(false);
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith("image/")) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  const handleLoadUrl = useCallback(() => {
    const url = urlInput.trim();
    if (!url) return;

    if (!isValidUrl(url)) {
      setUrlError("Please enter a valid URL.");
      return;
    }

    if (!looksLikeImageUrl(url)) {
      setUrlError(`Doesn\u2019t look like an image. Supported: ${ACCEPTED_DISPLAY}`);
      return;
    }

    setUrlError(null);
    setUrlLoading(true);

    const img = new window.Image();
    img.onload = () => {
      setUrlLoading(false);
      onLoadUrl(url);
    };
    img.onerror = () => {
      setUrlLoading(false);
      setUrlError("Couldn\u2019t load this image. Check the URL or try a different one.");
    };
    img.src = url;
  }, [urlInput, onLoadUrl]);

  return (
    <div className="space-y-4">
      {/* Main drop zone / gallery picker */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => galleryRef.current?.click()}
        className={cn(
          "relative h-[280px] flex flex-col items-center justify-center p-8 rounded-[1.5rem] cursor-pointer group transition-all",
          "bg-surface-lowest",
          dragOver ? "bg-primary-container/30" : "hover:bg-surface-low"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23afb3b066' stroke-width='2' stroke-dasharray='8%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          borderRadius: "1.5rem",
        }}
      >
        <input
          ref={galleryRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center mb-6 transition-transform duration-300 group-active:scale-95">
          <ImageIcon className="h-9 w-9 text-on-primary-container" />
        </div>
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-on-surface mb-2">
          Upload Photo
        </h3>
        <p className="text-sm text-on-surface-variant text-center px-4">
          Tap to browse gallery or drag &amp; drop
        </p>
      </div>

      {/* Camera button */}
      <button
        onClick={() => cameraRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-outline-variant/20 bg-surface-lowest text-on-surface hover:bg-surface-low transition-colors"
      >
        <Camera className="h-5 w-5 text-on-surface-variant" />
        <span className="text-sm font-medium">Take a photo</span>
      </button>
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="hidden"
      />

      {/* Image URL input */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-surface-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
            <span className="pl-3.5 text-on-surface-variant/40">
              <Link className="h-4 w-4" />
            </span>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => { setUrlInput(e.target.value); setUrlError(null); }}
              onKeyDown={(e) => { if (e.key === "Enter") handleLoadUrl(); }}
              placeholder="Or paste image URL…"
              className="flex-1 py-3 px-3 text-sm bg-transparent text-on-surface outline-none placeholder:text-on-surface-variant/40"
            />
          </div>
          <button
            onClick={handleLoadUrl}
            disabled={urlLoading || !urlInput.trim()}
            className="soul-gradient text-on-primary font-semibold py-3 px-5 rounded-xl hover:opacity-90 active:scale-95 transition-all shrink-0 disabled:opacity-40"
          >
            {urlLoading ? "Loading…" : "Load"}
          </button>
        </div>
        <p className="text-[10px] text-on-surface-variant/50 mt-1.5 px-1">
          {ACCEPTED_DISPLAY}
        </p>
        {urlError && (
          <div className="flex items-start gap-2 mt-1.5 px-1">
            <AlertCircle className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
            <p className="text-xs text-secondary">{urlError}</p>
          </div>
        )}
      </div>
    </div>
  );
}
