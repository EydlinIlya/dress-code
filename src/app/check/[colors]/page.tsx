"use client";

import { use, useState, useCallback, useMemo } from "react";
import { Plus } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { AllowedColorsDisplay } from "@/components/guest/AllowedColorsDisplay";
import { ImageUploader } from "@/components/guest/ImageUploader";
import { ImageCanvas } from "@/components/guest/ImageCanvas";
import { MatchResult } from "@/components/guest/MatchResult";
import { PhotoThumbnails } from "@/components/guest/PhotoThumbnails";
import { parseColorsFromUrl } from "@/lib/colors";
import { useCanvasSampler } from "@/hooks/useCanvasSampler";

interface Photo {
  file: File;
  url: string;
}

export default function GuestPage({
  params,
}: {
  params: Promise<{ colors: string }>;
}) {
  const { colors: colorsParam } = use(params);
  const allowedColors = useMemo(
    () => parseColorsFromUrl(colorsParam),
    [colorsParam]
  );

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const { canvasRef, sampledPoint, imageLoaded, loadImage, sampleAt } =
    useCanvasSampler();

  const handleUpload = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      setPhotos((prev) => {
        const next = [...prev, { file, url }];
        setActivePhotoIndex(next.length - 1);
        return next;
      });
      loadImage(file);
    },
    [loadImage]
  );

  const handleSelectPhoto = useCallback(
    (index: number) => {
      setActivePhotoIndex(index);
      loadImage(photos[index].file);
    },
    [photos, loadImage]
  );

  if (allowedColors.length === 0) {
    return (
      <div className="flex flex-col min-h-full">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="bg-surface-low rounded-[2rem] p-8 text-center max-w-sm">
            <p className="text-on-surface-variant">
              Invalid link. Please ask the host for a new one.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 pt-4 pb-16 px-6 max-w-md mx-auto w-full">
        {/* Hero */}
        <section className="mb-10">
          <h2 className="text-3xl leading-tight font-[family-name:var(--font-heading)] font-semibold tracking-tight text-on-surface mb-3">
            Check your outfit&apos;s color match.
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Upload a photo to see if your outfit matches the event&apos;s dress code.
          </p>
        </section>

        <div className="space-y-10">
          {/* Host's Palette */}
          <AllowedColorsDisplay colors={allowedColors} />

          {/* Upload / Canvas */}
          <section>
            {photos.length === 0 ? (
              <ImageUploader onUpload={handleUpload} />
            ) : (
              <div className="space-y-4">
                <PhotoThumbnails
                  photos={photos}
                  activeIndex={activePhotoIndex}
                  onSelect={handleSelectPhoto}
                />
                <ImageCanvas canvasRef={canvasRef} onSample={sampleAt} />
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      document.querySelector<HTMLInputElement>("#add-photo")?.click()
                    }
                    className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-surface-low"
                  >
                    <Plus className="h-4 w-4" />
                    Add another photo
                  </button>
                  <input
                    id="add-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file);
                      e.target.value = "";
                    }}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Verdict */}
          {imageLoaded && sampledPoint && (
            <MatchResult
              sampledColor={sampledPoint.color}
              allowedColors={allowedColors}
            />
          )}

          {/* Encouragement */}
          {photos.length === 0 && (
            <div className="flex items-center justify-center gap-3 px-6 py-4 bg-tertiary-container rounded-2xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-on-tertiary-container">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium text-on-tertiary-container">
                We&apos;ll analyze your color match instantly.
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
