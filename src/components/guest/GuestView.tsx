"use client";

import { useState, useRef } from "react";
import { Plus, Pipette, Camera } from "lucide-react";
import { AllowedColorsDisplay } from "@/components/guest/AllowedColorsDisplay";
import { ImageUploader } from "@/components/guest/ImageUploader";
import { ImageCanvas } from "@/components/guest/ImageCanvas";
import { MatchResult } from "@/components/guest/MatchResult";
import { PhotoThumbnails } from "@/components/guest/PhotoThumbnails";
import { Header } from "@/components/shared/Header";
import { useCanvasSampler } from "@/hooks/useCanvasSampler";
import { useEyeDropper } from "@/hooks/useEyeDropper";
import { PLAYFUL_LINES } from "@/lib/constants";
import type { SampledPoint } from "@/types";
import type { Strictness } from "@/types";

interface Photo {
  file: File;
  url: string;
}

function isPlural(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.includes(" & ") || lower.includes(" and ") || lower.includes(", ");
}

interface GuestViewProps {
  allowedColors: string[];
  hostName: string | null;
  strictness: Strictness;
  banner?: React.ReactNode;
}

export function GuestView({ allowedColors, hostName, strictness, banner }: GuestViewProps) {
  const [playfulLine] = useState(
    () => PLAYFUL_LINES[Math.floor(Math.random() * PLAYFUL_LINES.length)]
  );

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const { canvasRef, sampledPoint, imageLoaded, loadImage, sampleAt, setSampledPoint } =
    useCanvasSampler();
  const { supported: eyeDropperSupported, pickColor } = useEyeDropper();
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  function handleUpload(file: File) {
    const url = URL.createObjectURL(file);
    const newIndex = photos.length;
    setPhotos((prev) => [...prev, { file, url }]);
    setActivePhotoIndex(newIndex);
    loadImage(url);
  }

  function handleSelectPhoto(index: number) {
    if (index < 0 || index >= photos.length) return;
    setActivePhotoIndex(index);
    loadImage(photos[index].url);
  }

  async function handleEyeDropper() {
    const color = await pickColor();
    if (color) {
      setSampledPoint({ x: 0, y: 0, color } as SampledPoint);
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = "";
  }

  const inviteVerb = hostName && isPlural(hostName) ? "invite" : "invites";

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      {banner}
      <main className="flex-1 pt-4 pb-24 px-6 max-w-5xl mx-auto w-full">
        {/* Hero with personalized greeting */}
        <section className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl leading-tight font-[family-name:var(--font-heading)] font-semibold tracking-tight text-on-surface mb-3">
            {hostName ? (
              <><span className="text-primary">{hostName}</span> {inviteVerb} you to check your outfit.</>
            ) : (
              <>You&apos;re invited to an event with a dress code.</>
            )}
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Upload a photo to see if your outfit matches.
          </p>
          <p className="text-on-surface-variant/60 text-sm mt-2 italic">
            {playfulLine}
          </p>
        </section>

        {/* Desktop: two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left column: Palette + Encouragement */}
          <div className="lg:w-[300px] shrink-0 space-y-6">
            <AllowedColorsDisplay colors={allowedColors} />

            {photos.length === 0 && (
              <div className="flex items-center gap-3 px-5 py-4 bg-tertiary-container rounded-2xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-on-tertiary-container shrink-0">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium text-on-tertiary-container">
                  We&apos;ll analyze your color match instantly.
                </span>
              </div>
            )}

            {/* Verdict on desktop sits under palette */}
            {imageLoaded && sampledPoint && (
              <div className="hidden lg:block">
                <MatchResult
                  sampledColor={sampledPoint.color}
                  allowedColors={allowedColors}
                  strictness={strictness}
                />
              </div>
            )}
          </div>

          {/* Right column: Upload / Canvas */}
          <div className="flex-1 min-w-0 space-y-4">
            {photos.length === 0 ? (
              <ImageUploader onUpload={handleUpload} />
            ) : (
              <>
                <PhotoThumbnails
                  photos={photos}
                  activeIndex={activePhotoIndex}
                  onSelect={handleSelectPhoto}
                />
                <ImageCanvas canvasRef={canvasRef} onSample={sampleAt} hasSampled={!!sampledPoint} />

                {/* Action buttons — larger touch targets */}
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => galleryRef.current?.click()}
                    className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-3 px-5 rounded-2xl hover:bg-surface-low border border-outline-variant/20"
                  >
                    <Plus className="h-5 w-5" />
                    Add photo
                  </button>
                  <button
                    onClick={() => cameraRef.current?.click()}
                    className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-3 px-5 rounded-2xl hover:bg-surface-low border border-outline-variant/20"
                  >
                    <Camera className="h-5 w-5" />
                    Take photo
                  </button>
                  {eyeDropperSupported && (
                    <button
                      onClick={handleEyeDropper}
                      className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-3 px-5 rounded-2xl hover:bg-surface-low border border-outline-variant/20"
                    >
                      <Pipette className="h-5 w-5" />
                      Pick from screen
                    </button>
                  )}
                  <input
                    ref={galleryRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <input
                    ref={cameraRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Verdict on mobile: sticky bottom bar */}
        {imageLoaded && sampledPoint && (
          <div className="lg:hidden">
            <MatchResult
              sampledColor={sampledPoint.color}
              allowedColors={allowedColors}
              variant="sticky"
              strictness={strictness}
            />
          </div>
        )}
      </main>
    </div>
  );
}
