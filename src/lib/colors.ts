import chroma from "chroma-js";
import type { MatchResult, ColorSuggestions } from "@/types";
import { DELTA_E_GOOD, DELTA_E_ASK, MATCH_MESSAGES } from "./constants";

export function parseColorsFromUrl(param: string): string[] {
  return param
    .split("-")
    .filter((hex) => /^[0-9a-fA-F]{6}$/.test(hex))
    .map((hex) => `#${hex}`);
}

export function generateShareUrl(colors: string[]): string {
  const encoded = colors.map((c) => c.replace("#", "")).join("-");
  return `/check/${encoded}`;
}

export function evaluateMatch(
  sampleHex: string,
  allowedColors: string[]
): MatchResult {
  let minDelta = Infinity;
  let closestColor = allowedColors[0];

  for (const color of allowedColors) {
    const delta = chroma.deltaE(sampleHex, color);
    if (delta < minDelta) {
      minDelta = delta;
      closestColor = color;
    }
  }

  const deltaE = Math.round(minDelta * 10) / 10;

  if (minDelta <= DELTA_E_GOOD) {
    return { level: "good", message: MATCH_MESSAGES.good, deltaE, closestColor };
  }
  if (minDelta <= DELTA_E_ASK) {
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
