"use client";

import { X } from "lucide-react";

interface ColorListProps {
  colors: string[];
  onRemove: (index: number) => void;
}

export function ColorList({ colors, onRemove }: ColorListProps) {
  if (colors.length === 0) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2">
        <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-outline-variant/30 flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-outline-variant/40">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3"/>
            <circle cx="7.5" cy="11.5" r="1.5" fill="currentColor" opacity="0.3"/>
            <circle cx="12" cy="7.5" r="1.5" fill="currentColor" opacity="0.3"/>
            <circle cx="16.5" cy="11.5" r="1.5" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 px-2">
      {colors.map((color, i) => (
        <div key={`${color}-${i}`} className="flex flex-col items-center gap-3 shrink-0">
          <div className="relative group">
            <div
              className="w-20 h-20 rounded-2xl shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]"
              style={{ backgroundColor: color }}
            />
            <button
              onClick={() => onRemove(i)}
              className="absolute top-1 right-1 w-6 h-6 bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-black/60"
              aria-label={`Remove color ${color}`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <span className="font-mono text-[10px] text-on-surface-variant">
            {color.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}
