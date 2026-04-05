"use client";

import { cn } from "@/lib/utils";
import { STRICTNESS_PRESETS } from "@/lib/constants";
import type { Strictness } from "@/types";

interface StrictnessSelectorProps {
  value: Strictness;
  onChange: (value: Strictness) => void;
}

const options: { key: Strictness; color: string; activeColor: string; dotColor: string }[] = [
  { key: "strict", color: "bg-amber-100", activeColor: "bg-amber-200 ring-2 ring-amber-400", dotColor: "bg-amber-500" },
  { key: "default", color: "bg-emerald-100", activeColor: "bg-emerald-200 ring-2 ring-emerald-400", dotColor: "bg-emerald-500" },
  { key: "relaxed", color: "bg-sky-100", activeColor: "bg-sky-200 ring-2 ring-sky-400", dotColor: "bg-sky-500" },
];

export function StrictnessSelector({ value, onChange }: StrictnessSelectorProps) {
  return (
    <div className="space-y-3">
      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block">
        How strict?
      </span>

      {/* Gradient track */}
      <div className="relative flex rounded-2xl overflow-hidden border border-outline-variant/20">
        {options.map((opt) => {
          const preset = STRICTNESS_PRESETS[opt.key];
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              className={cn(
                "flex-1 py-4 px-3 flex flex-col items-center gap-1.5 transition-all relative",
                active ? opt.activeColor : opt.color,
                "hover:brightness-95"
              )}
            >
              <div className={cn("w-3 h-3 rounded-full transition-transform", opt.dotColor, active && "scale-125")} />
              <span className={cn(
                "text-sm font-semibold font-[family-name:var(--font-heading)]",
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
