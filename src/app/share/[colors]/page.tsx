"use client";

import { use, useMemo, useState } from "react";
import { ArrowLeft, Link, Check, Copy, Eye } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { StrictnessSelector } from "@/components/host/StrictnessSelector";
import { StyleSelector } from "@/components/host/StyleSelector";
import { parseColorsFromUrl, generateShareUrl, encodeShareData } from "@/lib/colors";
import { useClipboard } from "@/hooks/useClipboard";
import { MAX_NAME_LENGTH } from "@/lib/constants";
import { notFound } from "next/navigation";
import type { Strictness, GuestStyle } from "@/types";

function isPlural(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.includes(" & ") || lower.includes(" and ") || lower.includes(", ");
}

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
  const [strictness, setStrictness] = useState<Strictness>("default");
  const [guestStyle, setGuestStyle] = useState<GuestStyle>("wedding");
  const { copied, copy } = useClipboard();

  if (allowedColors.length === 0) {
    notFound();
  }

  const basePath = generateShareUrl(allowedColors);
  const encoded = encodeShareData(hostName.trim(), strictness, guestStyle);
  const queryString = encoded ? `?d=${encoded}` : "";
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${basePath}${queryString}`
      : `${basePath}${queryString}`;

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 pt-4 pb-16 px-6 max-w-5xl mx-auto w-full">
        {/* Back link */}
        <a
          href={`/?c=${allowedColors.map(c => c.replace("#", "")).join("-")}`}
          className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to color picker
        </a>

        {/* Hero */}
        <section className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl leading-tight font-[family-name:var(--font-heading)] font-semibold tracking-tight text-on-surface mb-3">
            Your dress code is ready.
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Customize your settings and share the link with your guests.
          </p>
        </section>

        {/* Desktop: two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left column: Palette + Settings */}
          <div className="lg:w-[400px] shrink-0 space-y-8">
            {/* Color swatches */}
            <section className="p-6 bg-surface-low rounded-[1.5rem]">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-5">
                Your Palette
              </span>
              <div className="grid grid-cols-4 gap-4 justify-items-center">
                {allowedColors.map((color, i) => (
                  <div key={`${color}-${i}`} className="flex flex-col items-center gap-2">
                    <div
                      className="w-14 h-14 rounded-2xl shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      {color.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Strictness */}
            <section>
              <StrictnessSelector value={strictness} onChange={setStrictness} />
            </section>

            {/* Guest page style */}
            <section>
              <StyleSelector value={guestStyle} onChange={setGuestStyle} />
            </section>

          </div>

          {/* Right column: Share link (visually prominent) */}
          <div className="flex-1 min-w-0">
            <section className="bg-surface-lowest rounded-[2rem] p-8 lg:p-10 shadow-[0px_10px_30px_rgba(47,51,49,0.05)] border border-outline-variant/10 lg:sticky lg:top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Link className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl">
                  Share Your Link
                </h3>
              </div>

              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Send this link to your guests. They&apos;ll be able to upload a photo and instantly check if their outfit matches your palette.
              </p>

              {/* Host name */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Your name <span className="text-on-surface-variant/60">(optional)</span>
                </label>
                <p className="text-xs text-on-surface-variant mb-2">
                  Guests will see &quot;{hostName.trim()
                    ? `${hostName.trim()} ${isPlural(hostName) ? "invite" : "invites"}`
                    : "You\u2019re invited to an event with a dress code"}&quot;
                </p>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value.slice(0, MAX_NAME_LENGTH))}
                  placeholder="e.g. Emma & James"
                  className="w-full bg-surface-low border border-outline-variant/20 rounded-xl py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>

              <div className="bg-surface-low rounded-xl px-4 py-4 mb-6 font-mono text-sm text-on-surface-variant break-all select-all">
                {fullUrl}
              </div>

              <button
                onClick={() => copy(fullUrl)}
                className="w-full soul-gradient text-on-primary font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all text-lg"
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

              <a
                href={`/preview/${colorsParam}${queryString}`}
                className="w-full mt-3 border border-outline-variant/30 text-on-surface font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-low active:scale-[0.98] transition-all"
              >
                <Eye className="h-5 w-5" />
                <span>Preview as Guest</span>
              </a>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
