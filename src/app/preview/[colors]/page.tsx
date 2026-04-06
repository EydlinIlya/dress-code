"use client";

import { use, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Copy, Check, Eye } from "lucide-react";
import { notFound } from "next/navigation";
import { GuestView } from "@/components/guest/GuestView";
import { parseColorsFromUrl, generateShareUrl, sanitizeName, parseStrictness, decodeShareData } from "@/lib/colors";
import { useClipboard } from "@/hooks/useClipboard";
import type { Strictness } from "@/types";

export default function PreviewPage({
  params,
}: {
  params: Promise<{ colors: string }>;
}) {
  const { colors: colorsParam } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { copied, copy } = useClipboard();

  const dParam = searchParams.get("d");
  const decoded = decodeShareData(dParam);
  const rawName = decoded.name ?? searchParams.get("name");
  const hostName = rawName ? sanitizeName(rawName) : null;
  const strictness: Strictness = decoded.strictness !== "default" ? decoded.strictness : parseStrictness(searchParams.get("s"));

  const allowedColors = useMemo(
    () => parseColorsFromUrl(colorsParam),
    [colorsParam]
  );

  if (allowedColors.length === 0) {
    notFound();
  }

  const guestPath = generateShareUrl(allowedColors);
  const queryString = dParam ? `?d=${dParam}` : "";
  const guestUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${guestPath}${queryString}`
      : `${guestPath}${queryString}`;

  const banner = (
    <div className="bg-secondary-container border-b border-outline-variant/20">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to settings</span>
          </button>
          <div className="flex items-center gap-1.5 text-sm font-medium text-on-surface-variant/70">
            <Eye className="h-4 w-4 shrink-0" />
            <span>Preview</span>
          </div>
        </div>
        <button
          onClick={() => copy(guestUrl)}
          className="flex items-center gap-2 text-sm font-semibold soul-gradient text-on-primary px-4 py-2 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all shrink-0"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <GuestView
      allowedColors={allowedColors}
      hostName={hostName}
      strictness={strictness}
      banner={banner}
    />
  );
}
