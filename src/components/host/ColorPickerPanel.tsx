"use client";

import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Pipette, Plus } from "lucide-react";
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
    <div className="flex flex-col gap-5">
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
