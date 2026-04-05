export type MatchLevel = "good" | "ask" | "no";
export type Strictness = "strict" | "default" | "relaxed";

export interface MatchResult {
  level: MatchLevel;
  message: string;
  deltaE: number;
  closestColor: string;
}

export interface ColorSuggestions {
  complementary: string[];
  analogous: string[];
  triadic: string[];
  splitComplementary: string[];
}

export interface SampledPoint {
  x: number;
  y: number;
  color: string;
}
