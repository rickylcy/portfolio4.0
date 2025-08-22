"use client";
import { MotionConfig } from "framer-motion";
import { useA11yStore } from "@/store/useA11yStore";

export default function A11yMotionBridge({ children }) {
  const reduce = useA11yStore((s) => s.reduceMotion);
  return (
    <MotionConfig reducedMotion={reduce ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
