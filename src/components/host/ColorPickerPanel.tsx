"use client";

import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Pipette, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEyeDropper } from "@/hooks/useEyeDropper";
import { isValidHex } from "@/lib/colors";
import { MAX_COLORS } from "@/lib/constants";

interface ColorPickerPanelProps {
  colors: string[];
  onAddColor: (color: string) => void;
}

export function ColorPickerPanel({ colors, onAddColor }: ColorPickerPanelProps) {
  const [currentColor, setCurrentColor] = useState("#e05a8d");
  const { supported: eyeDropperSupported, pickColor } = useEyeDropper();

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3">
        <HexColorPicker
          color={currentColor}
          onChange={setCurrentColor}
          style={{ width: "100%", maxWidth: 280, height: 200 }}
        />

        <div className="flex items-center gap-2 w-full max-w-[280px]">
          <div className="flex items-center gap-1.5 flex-1 border rounded-md px-3 h-9 bg-background">
            <span className="text-muted-foreground text-sm">#</span>
            <HexColorInput
              color={currentColor}
              onChange={setCurrentColor}
              className="flex-1 bg-transparent text-sm outline-none uppercase font-mono"
              prefixed={false}
            />
          </div>

          {eyeDropperSupported && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleEyeDropper}
              title="Pick color from screen"
            >
              <Pipette className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full max-w-[280px]">
          <div
            className="w-9 h-9 rounded-md border shrink-0"
            style={{ backgroundColor: currentColor }}
          />
          <Button
            onClick={handleAdd}
            disabled={colors.length >= MAX_COLORS}
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Color
          </Button>
        </div>
      </div>
    </div>
  );
}
