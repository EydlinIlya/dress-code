"use client";

import { useState, useCallback, useEffect } from "react";

interface EyeDropperResult {
  sRGBHex: string;
}

interface EyeDropperAPI {
  open: () => Promise<EyeDropperResult>;
}

export function useEyeDropper() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported("EyeDropper" in window);
  }, []);

  const pickColor = useCallback(async (): Promise<string | null> => {
    if (!("EyeDropper" in window)) return null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dropper: EyeDropperAPI = new (window as any).EyeDropper();
      const result = await dropper.open();
      return result.sRGBHex;
    } catch {
      return null;
    }
  }, []);

  return { supported, pickColor };
}
