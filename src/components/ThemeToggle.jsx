"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const onClick = () => setTheme(isDark ? "light" : "dark");

  return (
    <Button variant="outline" aria-label="Toggle theme" onClick={onClick}>
      {isDark ? "☀️" : "🌙"}
    </Button>
  );
}
