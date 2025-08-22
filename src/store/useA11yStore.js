"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useA11yStore = create(
  persist(
    (set) => ({
      textScale: "normal", // "normal" | "large"
      highContrast: false,
      reduceMotion: false,
      underlineLinks: false,
      alwaysShowFocus: false,
      lineHeight: "normal", // "normal" | "spacious"

      set: (partial) => set(partial),
      reset: () =>
        set({
          textScale: "normal",
          highContrast: false,
          reduceMotion: false,
          underlineLinks: false,
          alwaysShowFocus: false,
          lineHeight: "normal",
        }),
    }),
    { name: "a11y-prefs" }
  )
);
