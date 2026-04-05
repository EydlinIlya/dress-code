import chroma from "chroma-js";
import type { MatchResult, ColorSuggestions } from "@/types";
import {
  STRICTNESS_PRESETS,
  DELTA_E_KL,
  DELTA_E_KC,
  DELTA_E_KH,
  MATCH_MESSAGES,
  MAX_NAME_LENGTH,
} from "./constants";
import type { Strictness } from "@/types";

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

export function evaluateMatch(
  sampleHex: string,
  allowedColors: string[],
  strictness: Strictness = "default"
): MatchResult {
  const { good: thresholdGood, ask: thresholdAsk } = STRICTNESS_PRESETS[strictness];
  let minDelta = Infinity;
  let closestColor = allowedColors[0];

  for (const color of allowedColors) {
    const delta = chroma.deltaE(sampleHex, color, DELTA_E_KL, DELTA_E_KC, DELTA_E_KH);

    // Per-component diffs for debugging
    const [sL, sA, sB] = chroma(sampleHex).lab();
    const [cL, cA, cB] = chroma(color).lab();
    const defaultDelta = chroma.deltaE(sampleHex, color);
    console.log(
      `[match] ${sampleHex} vs ${color}` +
      ` | ΔL=${(sL - cL).toFixed(1)} Δa=${(sA - cA).toFixed(1)} Δb=${(sB - cB).toFixed(1)}` +
      ` | deltaE(default)=${defaultDelta.toFixed(1)} deltaE(weighted)=${delta.toFixed(1)}` +
      ` | weights: Kl=${DELTA_E_KL} Kc=${DELTA_E_KC} Kh=${DELTA_E_KH}`
    );

    if (delta < minDelta) {
      minDelta = delta;
      closestColor = color;
    }
  }

  const deltaE = Math.round(minDelta * 10) / 10;
  console.log(`[match] → closest=${closestColor} deltaE=${deltaE} strictness=${strictness} thresholds: good≤${thresholdGood} ask≤${thresholdAsk}`);

  if (minDelta <= thresholdGood) {
    return { level: "good", message: MATCH_MESSAGES.good, deltaE, closestColor };
  }
  if (minDelta <= thresholdAsk) {
    return { level: "ask", message: MATCH_MESSAGES.ask, deltaE, closestColor };
  }
  return { level: "no", message: MATCH_MESSAGES.no, deltaE, closestColor };
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

export function rgbToHex(r: number, g: number, b: number): string {
  return chroma(r, g, b).hex();
}

export function isValidHex(hex: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(hex);
}
