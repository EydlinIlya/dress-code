"use client";

import { use, useState, useCallback, useMemo } from "react";
import { Header } from "@/components/shared/Header";
import { AllowedColorsDisplay } from "@/components/guest/AllowedColorsDisplay";
import { ImageUploader } from "@/components/guest/ImageUploader";
import { ImageCanvas } from "@/components/guest/ImageCanvas";
import { MatchResult } from "@/components/guest/MatchResult";
import { PhotoThumbnails } from "@/components/guest/PhotoThumbnails";
import { parseColorsFromUrl } from "@/lib/colors";
import { useCanvasSampler } from "@/hooks/useCanvasSampler";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        <main className="flex-1 container mx-auto px-4 py-8 max-w-xl flex items-center justify-center">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                Invalid link. Please ask the host for a new one.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Check Your Outfit
          </h1>
          <p className="text-muted-foreground">
            Upload a photo and tap on your outfit to see if it matches.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dress Code Colors</CardTitle>
              <CardDescription>
                The host has chosen these colors for the event.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AllowedColorsDisplay colors={allowedColors} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Outfit</CardTitle>
              <CardDescription>
                Upload a photo and tap the color you want to check.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {photos.length === 0 ? (
                <ImageUploader onUpload={handleUpload} />
              ) : (
                <>
                  <PhotoThumbnails
                    photos={photos}
                    activeIndex={activePhotoIndex}
                    onSelect={handleSelectPhoto}
                  />
                  <ImageCanvas canvasRef={canvasRef} onSample={sampleAt} />
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.querySelector<HTMLInputElement>("#add-photo")?.click()
                      }
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add another photo
                    </Button>
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
                </>
              )}
            </CardContent>
          </Card>

          {imageLoaded && sampledPoint && (
            <MatchResult
              sampledColor={sampledPoint.color}
              allowedColors={allowedColors}
            />
          )}
        </div>
      </main>
    </div>
  );
}
