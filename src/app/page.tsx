"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/shared/Header";
import { ColorPickerPanel } from "@/components/host/ColorPickerPanel";
import { ColorList } from "@/components/host/ColorList";
import { ColorSuggestions } from "@/components/host/ColorSuggestions";
import { ShareLinkGenerator } from "@/components/host/ShareLinkGenerator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HostPage() {
  const [colors, setColors] = useState<string[]>([]);

  const handleAddColor = useCallback((color: string) => {
    setColors((prev) => {
      if (prev.includes(color)) return prev;
      return [...prev, color];
    });
  }, []);

  const handleRemoveColor = useCallback((index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const lastColor = colors.length > 0 ? colors[colors.length - 1] : null;

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Set Your Dress Code
          </h1>
          <p className="text-muted-foreground">
            Pick the colors your guests should match, then share the link.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pick Colors</CardTitle>
            <CardDescription>
              Choose one or more colors for your event dress code.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ColorPickerPanel colors={colors} onAddColor={handleAddColor} />

            <Separator />

            <ColorList colors={colors} onRemove={handleRemoveColor} />

            {lastColor && (
              <>
                <Separator />
                <ColorSuggestions
                  baseColor={lastColor}
                  onSelect={handleAddColor}
                />
              </>
            )}

            {colors.length > 0 && (
              <>
                <Separator />
                <ShareLinkGenerator colors={colors} />
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
