// Black / white detection (applied to host colors)
export const BLACK_L_MAX = 15;        // L* ≤ this → candidate for "black"
export const WHITE_L_MIN = 90;        // L* ≥ this → candidate for "white"
// At very low L* a chroma of 8 is still just a dark tinted colour → generous black threshold.
export const BLACK_CHROMA_MAX = 8;
// At very high L* even chroma ≈ 5 is visibly warm/tinted (ivory territory) → strict white threshold.
// Ivory (#FFFFF0) has C ≈ 5.5, so keep this below that.
export const WHITE_CHROMA_MAX = 4;

// Black / white guard (applied to guest sample when matching against an achromatic host colour)
// If the sample's chroma exceeds the host colour's chroma by more than this margin the match is
// hard-blocked (ivory can't match white; dark navy can't match black).
export const CHROMA_GUARD_MARGIN = 3;

// Auto white balance (gray-world algorithm applied to the full image on load)
// Strength blends between no correction (0) and full gray-world correction (1).
// Per-channel scale is then capped at AWB_MAX_SCALE as a safety net.
export const AWB_STRENGTH = 0.3;
export const AWB_MAX_SCALE = 1.2;

// Non-linear colour-count strictness multiplier (chromatic colours only, not black/white)
// threshold × (1 / numChromaticColors ^ COLOR_COUNT_EXPONENT)
// 1 colour → ×1.00   2 → ×0.92   5 → ×0.85   10 → ×0.79
export const COLOR_COUNT_EXPONENT = 0.12;

// Strictness presets: [good threshold, ask threshold]
export const STRICTNESS_PRESETS = {
  strict:  { good: 14, ask: 20, label: "Exact match", description: "Uniform — colors must be spot-on" },
  default: { good: 18, ask: 28, label: "Photo-ready", description: "Close enough for nice photos" },
  relaxed: { good: 25, ask: 35, label: "General vibe", description: "Right ballpark is fine" },
} as const;

export const MAX_COLORS = 10;

export const SAMPLE_REGION_SIZE = 5;

export const MAX_NAME_LENGTH = 50;

export const MATCH_MESSAGES = {
  good: "Good choice!",
  ask: "Better ask the host",
  no: "Not a match, try something else",
} as const;

export const PLAYFUL_LINES = [
  "It\u2019s a pleasure to have you as a guest. In some dresses, more pleasure than in others.",
  "Looking good is optional. Looking right is not.",
  "The host picked the colors. You pick the outfit. Let\u2019s see if it\u2019s a match.",
  "Your style, their palette. Let\u2019s make sure they agree.",
] as const;
