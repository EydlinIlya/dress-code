"use client";

import { use, useMemo, useState } from "react";
import { ArrowLeft, Link, Check, Copy } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { parseColorsFromUrl, generateShareUrl } from "@/lib/colors";
import { useClipboard } from "@/hooks/useClipboard";
import { MAX_NAME_LENGTH } from "@/lib/constants";
import { notFound } from "next/navigation";

export default function SharePage({
  params,
}: {
  params: Promise<{ colors: string }>;
}) {
  const { colors: colorsParam } = use(params);
  const allowedColors = useMemo(
    () => parseColorsFromUrl(colorsParam),
    [colorsParam]
  );

  const [hostName, setHostName] = useState("");
  const { copied, copy } = useClipboard();

  if (allowedColors.length === 0) {
    notFound();
  }

  const basePath = generateShareUrl(allowedColors);
  const nameParam = hostName.trim()
    ? `?name=${encodeURIComponent(hostName.trim())}`
    : "";
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${basePath}${nameParam}`
      : `${basePath}${nameParam}`;

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 pt-4 pb-16 px-6 max-w-lg mx-auto w-full">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to color picker
        </a>

        {/* Palette review */}
        <section className="mb-10">
          <h2 className="text-3xl md:text-4xl leading-tight font-[family-name:var(--font-heading)] font-semibold tracking-tight text-on-surface mb-3">
            Your dress code is ready.
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Share this link with your guests so they can check their outfits.
          </p>
        </section>

        {/* Color swatches */}
        <section className="p-6 bg-surface-low rounded-[1.5rem] mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-5">
            Your Palette
          </span>
          <div className="flex flex-wrap gap-5 justify-center">
            {allowedColors.map((color, i) => (
              <div key={`${color}-${i}`} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 rounded-2xl shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]"
                  style={{ backgroundColor: color }}
                />
                <span className="font-mono text-[10px] text-on-surface-variant">
                  {color.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Optional name */}
        <section className="mb-8">
          <label className="block text-sm font-medium text-on-surface mb-2">
            Your name <span className="text-on-surface-variant/60">(optional)</span>
          </label>
          <p className="text-xs text-on-surface-variant mb-3">
            Guests will see &quot;{hostName.trim() || "You"} invites you to check your outfit&quot;
          </p>
          <input
            type="text"
            value={hostName}
            onChange={(e) => setHostName(e.target.value.slice(0, MAX_NAME_LENGTH))}
            placeholder="e.g. Emma & James"
            className="w-full bg-surface-lowest border border-outline-variant/20 rounded-xl py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </section>

        {/* Share link */}
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
      </main>
    </div>
  );
}
