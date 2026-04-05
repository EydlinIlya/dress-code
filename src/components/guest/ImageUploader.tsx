"use client";

import { useCallback, useRef, useState } from "react";
import { ImageIcon, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
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

      {/* Separate camera button for mobile */}
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
    </div>
  );
}
