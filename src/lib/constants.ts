// CIEDE2000 weighting factors
export const DELTA_E_KL = 0.7; // lightness — forgiving on brightness (low-light photos)
export const DELTA_E_KC = 0.7; // chroma — stricter so black/white don't match chromatic colors
export const DELTA_E_KH = 1;   // hue

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
