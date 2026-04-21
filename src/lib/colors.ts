import chroma from "chroma-js";
import type { MatchResult, ColorSuggestions } from "@/types";
import {
  STRICTNESS_PRESETS,
  MAX_NAME_LENGTH,
  BLACK_L_MAX,
  WHITE_L_MIN,
  BLACK_CHROMA_MAX,
  WHITE_CHROMA_MAX,
  CHROMA_GUARD_MARGIN,
  COLOR_COUNT_EXPONENT,
  AWB_STRENGTH,
  AWB_MAX_SCALE,
} from "./constants";
import type { Strictness, GuestStyle } from "@/types";
import { normalizeLocale, type Locale } from "./i18n/translations";

export function parseColorsFromUrl(param: string): string[] {
  let decoded: string;
  try {
    decoded = decodeURIComponent(param);
  } catch {
    return [];
  }
  // Strip anything that isn't a hex char or hyphen
  const sanitized = decoded.replace(/[^0-9a-fA-F-]/g, "");
  return sanitized
    .split("-")
    .filter((hex) => /^[0-9a-fA-F]{6}$/.test(hex))
    .map((hex) => `#${hex.toLowerCase()}`);
}

export function generateShareUrl(colors: string[]): string {
  const encoded = colors
    .map((c) => c.replace("#", "").toLowerCase().trim())
    .join("-");
  return `/check/${encoded}`;
}

export function generateSharePageUrl(colors: string[]): string {
  const encoded = colors
    .map((c) => c.replace("#", "").toLowerCase().trim())
    .join("-");
  return `/share/${encoded}`;
}

export function sanitizeName(name: string): string {
  let decoded: string;
  try {
    decoded = decodeURIComponent(name);
  } catch {
    decoded = name;
  }
  // Strip HTML tags and trim
  return decoded.replace(/<[^>]*>/g, "").trim().slice(0, MAX_NAME_LENGTH);
}

export function parseStrictness(param: string | null): Strictness {
  if (param === "strict" || param === "relaxed") return param;
  return "default";
}

export function parseGuestStyle(param: string | null): GuestStyle {
  if (param === "party" || param === "gala") return param;
  return "wedding";
}

/** Unicode-safe base64 encode */
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

/** Unicode-safe base64 decode */
function base64ToUtf8(encoded: string): string {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

/** Encode name + strictness + style + locale into an opaque base64 query param */
export function encodeShareData(
  name: string,
  strictness: Strictness,
  style: GuestStyle = "wedding",
  locale: Locale = "en"
): string {
  const payload: Record<string, string> = {};
  if (name) payload.n = name;
  if (strictness !== "default") payload.s = strictness;
  if (style !== "wedding") payload.t = style;
  if (locale !== "en") payload.l = locale;
  if (Object.keys(payload).length === 0) return "";
  return utf8ToBase64(JSON.stringify(payload));
}

/** Decode the opaque `d` query param back to name + strictness + style + locale */
export function decodeShareData(encoded: string | null): {
  name: string | null;
  strictness: Strictness;
  style: GuestStyle;
  locale: Locale | null;
} {
  if (!encoded) return { name: null, strictness: "default", style: "wedding", locale: null };
  try {
    const json = JSON.parse(base64ToUtf8(encoded));
    const name = typeof json.n === "string" ? sanitizeName(json.n) : null;
    const strictness = parseStrictness(typeof json.s === "string" ? json.s : null);
    const style = parseGuestStyle(typeof json.t === "string" ? json.t : null);
    const locale = normalizeLocale(typeof json.l === "string" ? json.l : null);
    return { name, strictness, style, locale };
  } catch {
    return { name: null, strictness: "default", style: "wedding", locale: null };
  }
}

type HostColorClass = "black" | "white" | "chromatic";

/** Classify a host-chosen colour as black, white, or chromatic. */
function classifyHostColor(hex: string): HostColorClass {
  const [L] = chroma(hex).lab();
  const C = chroma(hex).lch()[1];
  if (L <= BLACK_L_MAX && C <= BLACK_CHROMA_MAX) return "black";
  if (L >= WHITE_L_MIN && C <= WHITE_CHROMA_MAX) return "white";
  return "chromatic";
}

/**
 * Threshold multiplier based on how many chromatic colours the host chose.
 * More options → stricter matching (non-linear, "small" effect).
 */
function colorCountMultiplier(numChromatic: number): number {
  if (numChromatic <= 1) return 1;
  return 1 / Math.pow(numChromatic, COLOR_COUNT_EXPONENT);
}

export function evaluateMatch(
  sampleHex: string,
  allowedColors: string[],
  strictness: Strictness = "default"
): MatchResult {
  const { good: rawGood, ask: rawAsk } = STRICTNESS_PRESETS[strictness];

  // Classify every host colour once
  const classified = allowedColors.map((hex) => ({
    hex,
    hostClass: classifyHostColor(hex),
  }));

  // Log host palette classification
  for (const { hex, hostClass } of classified) {
    const [L] = chroma(hex).lab();
    const C = chroma(hex).lch()[1];
    console.log(`[palette] ${hex} → ${hostClass} (L*=${L.toFixed(1)} C=${C.toFixed(1)})`);
  }

  const numChromatic = classified.filter((c) => c.hostClass === "chromatic").length;
  const multiplier = colorCountMultiplier(numChromatic);
  console.log(`[palette] chromatic=${numChromatic} multiplier=${multiplier.toFixed(3)}`);

  // Guest sample — classify + extract L*/C once (same logic as host colours)
  const sampleC = chroma(sampleHex).lch()[1];
  const [sampleL] = chroma(sampleHex).lab();
  const sampleClass = classifyHostColor(sampleHex);

  // Two separate trackers:
  // - effective: drives the level decision (may be 999 for hard-blocked pairs)
  // - display: always the raw CIEDE2000 nearest, shown in the UI even when rejected
  let minEffective = Infinity;
  let closestByEffective = allowedColors[0];
  let minDisplay = Infinity;
  let closestByDisplay = allowedColors[0];

  for (const { hex: color, hostClass } of classified) {
    // Standard CIEDE2000 (kL = kC = kH = 1)
    const actual = chroma.deltaE(sampleHex, color);
    let effective = actual;

    const hostC = chroma(color).lch()[1];
    const [hostL] = chroma(color).lab();

    if (hostClass === "black" || hostClass === "white") {
      // Chromatic sample can't match an achromatic host colour.
      // (e.g. dark navy can't match black; cream can't match white)
      if (sampleC > hostC + CHROMA_GUARD_MARGIN) {
        effective = 999;
      }
    }

    if ((sampleClass === "black" || sampleClass === "white") && hostClass === "chromatic") {
      // Reverse guard: achromatic sample can't match a chromatic host colour.
      // (e.g. near-black can't match dark navy; off-white can't match champagne)
      effective = 999;
    }

    console.log(
      `[match] ${sampleHex} (${sampleClass}, L=${sampleL.toFixed(1)}, C=${sampleC.toFixed(1)})` +
      ` vs ${color} (${hostClass}, L=${hostL.toFixed(1)}, C=${hostC.toFixed(1)})` +
      ` | deltaE=${actual.toFixed(1)} effective=${effective.toFixed(1)}`
    );

    if (effective < minEffective) {
      minEffective = effective;
      closestByEffective = color;
    }
    if (actual < minDisplay) {
      minDisplay = actual;
      closestByDisplay = color;
    }
  }

  // Level is decided by the effective (guard-aware) minimum.
  // Display always shows the raw nearest colour so rejected samples still
  // point to something meaningful in the UI.
  const closestColor = closestByDisplay;
  const closestClass = classifyHostColor(closestByEffective);
  const thresholdGood = closestClass === "chromatic" ? rawGood * multiplier : rawGood;
  const thresholdAsk  = closestClass === "chromatic" ? rawAsk  * multiplier : rawAsk;

  const deltaE = Math.round(minDisplay * 10) / 10;
  console.log(
    `[match] → closest=${closestColor} (${closestClass}) deltaE=${deltaE}` +
    ` strictness=${strictness} multiplier=${multiplier.toFixed(3)}` +
    ` thresholds: good≤${thresholdGood.toFixed(1)} ask≤${thresholdAsk.toFixed(1)}`
  );

  if (minEffective <= thresholdGood) {
    return { level: "good", deltaE, closestColor };
  }
  if (minEffective <= thresholdAsk) {
    return { level: "ask", deltaE, closestColor };
  }
  return { level: "no", deltaE, closestColor };
}

export function getSuggestions(baseHex: string): ColorSuggestions {
  const [h, s, l] = chroma(baseHex).hsl();
  const hue = isNaN(h) ? 0 : h;

  const make = (offset: number) =>
    chroma.hsl((hue + offset + 360) % 360, s, l).hex();

  return {
    complementary: [make(180)],
    analogous: [make(30), make(-30)],
    triadic: [make(120), make(240)],
    splitComplementary: [make(150), make(210)],
  };
}

export interface AwbFactors {
  scaleR: number;
  scaleG: number;
  scaleB: number;
}

/**
 * Gray-world auto white balance.
 * Assumes the scene average should be neutral gray; returns per-channel
 * scale factors capped at AWB_MAX_SCALE to prevent overcompensation.
 */
export function computeAwbFactors(pixels: Uint8ClampedArray): AwbFactors {
  let rSum = 0, gSum = 0, bSum = 0;
  const count = pixels.length / 4 || 1;
  for (let i = 0; i < pixels.length; i += 4) {
    rSum += pixels[i];
    gSum += pixels[i + 1];
    bSum += pixels[i + 2];
  }
  const rAvg = rSum / count || 1;
  const gAvg = gSum / count || 1;
  const bAvg = bSum / count || 1;
  const gray = (rAvg + gAvg + bAvg) / 3;

  // Blend toward identity: scale = 1 + (fullScale - 1) * strength
  // This prevents overcorrection on strongly tinted scenes.
  const blend = (full: number) =>
    Math.min(AWB_MAX_SCALE, 1 + (Math.min(AWB_MAX_SCALE, full) - 1) * AWB_STRENGTH);

  const factors: AwbFactors = {
    scaleR: blend(gray / rAvg),
    scaleG: blend(gray / gAvg),
    scaleB: blend(gray / bAvg),
  };

  console.log(
    `[awb] avgRGB=(${rAvg.toFixed(1)}, ${gAvg.toFixed(1)}, ${bAvg.toFixed(1)})` +
    ` gray=${gray.toFixed(1)}` +
    ` scale=(${factors.scaleR.toFixed(3)}, ${factors.scaleG.toFixed(3)}, ${factors.scaleB.toFixed(3)})`
  );

  return factors;
}

/**
 * Apply AWB scale factors to an ImageData in-place.
 */
export function applyAwb(imageData: ImageData, factors: AwbFactors): void {
  const d = imageData.data;
  const { scaleR, scaleG, scaleB } = factors;
  for (let i = 0; i < d.length; i += 4) {
    d[i]     = Math.min(255, (d[i]     * scaleR + 0.5)) | 0;
    d[i + 1] = Math.min(255, (d[i + 1] * scaleG + 0.5)) | 0;
    d[i + 2] = Math.min(255, (d[i + 2] * scaleB + 0.5)) | 0;
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return chroma(r, g, b).hex();
}

export function isValidHex(hex: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(hex);
}
