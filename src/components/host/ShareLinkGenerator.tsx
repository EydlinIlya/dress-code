"use client";

import { Link, Check, Copy } from "lucide-react";
import { generateShareUrl } from "@/lib/colors";
import { useClipboard } from "@/hooks/useClipboard";

interface ShareLinkGeneratorProps {
  colors: string[];
}

export function ShareLinkGenerator({ colors }: ShareLinkGeneratorProps) {
  const { copied, copy } = useClipboard();

  if (colors.length === 0) return null;

  const path = generateShareUrl(colors);
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${path}`
      : path;

  return (
    <section className="bg-surface-lowest rounded-[2rem] p-8 shadow-[0px_10px_30px_rgba(47,51,49,0.05)] border border-outline-variant/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Link className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg">
          Share Your Link
        </h3>
      </div>

      <div className="bg-surface-low rounded-xl px-4 py-4 mb-6 font-mono text-sm text-on-surface-variant truncate select-all">
        {fullUrl}
      </div>

      <button
        onClick={() => copy(fullUrl)}
        className="w-full soul-gradient text-on-primary font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
      >
        {copied ? (
          <>
            <Check className="h-5 w-5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-5 w-5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </section>
  );
}
