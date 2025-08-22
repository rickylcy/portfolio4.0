"use client";

import { useEffect } from "react";
import { useA11yStore } from "@/store/useA11yStore";

export default function A11yProvider() {
  const {
    textScale,
    highContrast,
    reduceMotion,
    underlineLinks,
    alwaysShowFocus,
    lineHeight,
  } = useA11yStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("a11y-text-lg", textScale === "large");
    root.classList.toggle("a11y-contrast", highContrast);
    root.classList.toggle("a11y-reduce-motion", reduceMotion);
    root.classList.toggle("a11y-underline-links", underlineLinks);
    root.classList.toggle("a11y-focus-always", alwaysShowFocus);
    root.classList.toggle("a11y-line-spacious", lineHeight === "spacious");
  }, [
    textScale,
    highContrast,
    reduceMotion,
    underlineLinks,
    alwaysShowFocus,
    lineHeight,
  ]);

  return null;
}
