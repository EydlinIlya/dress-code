"use client";

import { use, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { GuestView } from "@/components/guest/GuestView";
import { parseColorsFromUrl, sanitizeName, parseStrictness, decodeShareData } from "@/lib/colors";
import type { Strictness } from "@/types";

export default function GuestPage({
  params,
}: {
  params: Promise<{ colors: string }>;
}) {
  const { colors: colorsParam } = use(params);
  const searchParams = useSearchParams();
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

  return (
    <GuestView
      allowedColors={allowedColors}
      hostName={hostName}
      strictness={strictness}
      guestStyle={decoded.style}
    />
  );
}
