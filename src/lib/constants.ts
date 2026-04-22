// Black / white detection (applied to host colors)
export const BLACK_L_MAX = 35;        // L* ≤ this → candidate for "black" (catches dark charcoals)
export const WHITE_L_MIN = 85;        // L* ≥ this → candidate for "white" (catches near-whites below 90)
// At very low L* a chroma of 8 is still just a dark tinted colour → generous black threshold.
export const BLACK_CHROMA_MAX = 4.5;
// At very high L* chroma must be very low — C≈3.7 is already visibly warm/tinted.
// Ivory (#FFFFF0) has C ≈ 5.5, so keep well below that.
export const WHITE_CHROMA_MAX = 3;

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

// Strictness presets: [good threshold, ask threshold].
// Display labels/descriptions live in src/lib/i18n/translations.ts.
export const STRICTNESS_PRESETS = {
  strict:  { good: 14, ask: 20 },
  default: { good: 18, ask: 28 },
  relaxed: { good: 25, ask: 35 },
} as const;

export const MAX_COLORS = 10;

export const SAMPLE_REGION_SIZE = 5;

export const MAX_NAME_LENGTH = 50;

export const PLAYFUL_LINE_KEYS = ["playful.1", "playful.2", "playful.3", "playful.4"] as const;
