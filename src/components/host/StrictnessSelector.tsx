"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STRICTNESS_PRESETS } from "@/lib/constants";
import type { Strictness } from "@/types";

interface StrictnessSelectorProps {
  value: Strictness;
  onChange: (value: Strictness) => void;
}

const options: { key: Strictness; accent: string; activeBg: string; checkBg: string; inactiveBg: string }[] = [
  {
    key: "strict",
    accent: "border-amber-400",
    activeBg: "bg-amber-50",
    checkBg: "bg-amber-500",
    inactiveBg: "bg-surface-lowest",
  },
  {
    key: "default",
    accent: "border-emerald-400",
    activeBg: "bg-emerald-50",
    checkBg: "bg-emerald-500",
    inactiveBg: "bg-surface-lowest",
  },
  {
    key: "relaxed",
    accent: "border-sky-400",
    activeBg: "bg-sky-50",
    checkBg: "bg-sky-500",
    inactiveBg: "bg-surface-lowest",
  },
];

export function StrictnessSelector({ value, onChange }: StrictnessSelectorProps) {
  return (
    <div className="space-y-3">
      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block">
        How strict?
      </span>

      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => {
          const preset = STRICTNESS_PRESETS[opt.key];
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              className={cn(
                "relative rounded-2xl p-4 flex flex-col items-center gap-2 transition-all border-2",
                active
                  ? `${opt.activeBg} ${opt.accent} shadow-sm`
                  : `${opt.inactiveBg} border-outline-variant/20 hover:border-outline-variant/40 opacity-60 hover:opacity-80`
              )}
            >
              {/* Checkmark badge */}
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                active ? `${opt.checkBg} scale-100` : "bg-outline-variant/20 scale-90"
              )}>
                {active && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
              </div>

              <span className={cn(
                "text-sm font-semibold font-[family-name:var(--font-heading)] text-center leading-tight",
                active ? "text-on-surface" : "text-on-surface-variant"
              )}>
                {preset.label}
              </span>
              <span className="text-[11px] text-on-surface-variant/70 leading-tight text-center">
                {preset.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
