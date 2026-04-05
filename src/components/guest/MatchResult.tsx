"use client";

import { CircleCheck, CircleAlert, CircleX } from "lucide-react";
import { evaluateMatch } from "@/lib/colors";
import { cn } from "@/lib/utils";

interface MatchResultProps {
  sampledColor: string;
  allowedColors: string[];
}

const config = {
  good: {
    icon: CircleCheck,
    bg: "bg-[#e8f5e9]",
    text: "text-[#2e7d32]",
    border: "border-[#a5d6a7]",
    swatchRing: "ring-[#66bb6a]",
  },
  ask: {
    icon: CircleAlert,
    bg: "bg-[#fff8e1]",
    text: "text-[#f57f17]",
    border: "border-[#ffe082]",
    swatchRing: "ring-[#ffa726]",
  },
  no: {
    icon: CircleX,
    bg: "bg-[#fbe9e7]",
    text: "text-[#c62828]",
    border: "border-[#ef9a9a]",
    swatchRing: "ring-[#ef5350]",
  },
};

export function MatchResult({ sampledColor, allowedColors }: MatchResultProps) {
  const result = evaluateMatch(sampledColor, allowedColors);
  const { level, message, closestColor } = result;
  const { icon: Icon, bg, text, border, swatchRing } = config[level];

  return (
    <div
      className={cn(
        "rounded-[2rem] p-8 border transition-all duration-300 animate-fade-in-up",
        bg,
        border
      )}
    >
      <div className="flex flex-col items-center gap-5">
        <Icon className={cn("h-12 w-12", text)} />

        <span
          className={cn(
            "text-lg font-[family-name:var(--font-heading)] font-semibold",
            text
          )}
        >
          {message}
        </span>

        <div className="flex items-center gap-6 mt-2">
          <div className="text-center">
            <div
              className={cn(
                "w-14 h-14 rounded-full mx-auto ring-3 shadow-sm",
                swatchRing
              )}
              style={{ backgroundColor: sampledColor }}
            />
            <span className="text-[11px] text-on-surface-variant font-mono mt-2 block">
              Your pick
            </span>
          </div>

          <span className="text-on-surface-variant/40 text-sm font-medium">vs</span>

          <div className="text-center">
            <div
              className="w-14 h-14 rounded-full mx-auto shadow-sm border border-outline-variant/20"
              style={{ backgroundColor: closestColor }}
            />
            <span className="text-[11px] text-on-surface-variant font-mono mt-2 block">
              Closest
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
