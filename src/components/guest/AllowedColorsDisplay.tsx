"use client";

interface AllowedColorsDisplayProps {
  colors: string[];
}

export function AllowedColorsDisplay({ colors }: AllowedColorsDisplayProps) {
  return (
    <div className="p-6 bg-surface-low rounded-[1.5rem]">
      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-6">
        Host&apos;s Palette
      </span>
      <div className="flex items-center gap-6 justify-center">
        {colors.map((color, i) => (
          <div key={`${color}-${i}`} className="flex flex-col items-center gap-3">
            <div
              className="w-16 h-16 rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-medium font-mono text-on-surface-variant">
              {color.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
