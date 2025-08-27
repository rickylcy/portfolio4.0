"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery({
  images = [],
  altBase = "Screenshot",
  className = "",
  startIndex = 0,
  thumbFit = "contain",
  thumbHeight = "h-64 sm:h-80",
}) {
  const items = useMemo(
    () => Array.from(new Set((images || []).filter(Boolean))),
    [images]
  );

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(
    Math.min(Math.max(startIndex, 0), Math.max(0, items.length - 1))
  );
  const closeBtnRef = useRef(null);

  const openAt = useCallback((i) => {
    setIdx(i);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow || "";
      clearTimeout(t);
    };
  }, [open]);

  if (!items.length) return null;

  const fitClass = thumbFit === "cover" ? "object-cover" : "object-contain";

  return (
    <>
      {/* Thumbnails */}
      <div className={`mt-6 grid gap-3 sm:grid-cols-2 ${className}`}>
        {items.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openAt(i)}
            className="group relative overflow-hidden rounded-lg border bg-card"
            aria-label={`Open ${altBase} ${i + 1}`}
          >
            <div className={`relative w-full ${thumbHeight} bg-muted`}>
              <Image
                src={src}
                alt={`${altBase} ${i + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className={`${fitClass} transition-transform group-hover:scale-[1.01]`}
                priority={i === 0}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50" /* modal root */
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshots"
        >
          {/* Dim background (z-0) */}
          <div className="absolute inset-0 bg-black/70 z-0" onClick={close} />

          {/* Close button (z-30 so it's above everything) */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 z-30 rounded p-2 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content wrapper (z-10) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-6">
            <div className="relative w-[min(calc(100vw-1.5rem),1400px)] h-[min(94svh,calc(100vh-1.5rem))] sm:w-[min(calc(100vw-3rem),1400px)] sm:h-[min(94svh,calc(100vh-3rem))]">
              {/* Prev / Next (z-20 above image) */}
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded p-2 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
                  >
                    <ChevronLeft className="h-7 w-7" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded p-2 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
                  >
                    <ChevronRight className="h-7 w-7" />
                  </button>
                </>
              )}

              {/* Big image (z-10; pointer-events none so controls stay clickable) */}
              <Image
                src={items[idx]}
                alt={`${altBase} ${idx + 1}`}
                fill
                sizes="100vw"
                className="object-contain rounded-lg shadow z-10 pointer-events-none"
                priority
              />
            </div>
          </div>

          {/* Counter (z-20) */}
          <div className="absolute bottom-3 left-0 right-0 z-20 text-center text-sm text-white/85">
            {idx + 1} / {items.length}
          </div>
        </div>
      )}
    </>
  );
}
