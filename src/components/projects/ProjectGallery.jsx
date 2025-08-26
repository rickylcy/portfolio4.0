"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery({
  images = [],
  altBase = "Screenshot",
}) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const openAt = useCallback((i) => {
    setIdx(i);
    setOpen(true);
  }, []);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length]
  );

  // ESC / arrows
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

  // lock body scroll when modal open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prevOverflow || "";
    return () => (document.body.style.overflow = prevOverflow || "");
  }, [open]);

  if (!images.length) return null;

  return (
    <>
      {/* Grid */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={src}
            className="group relative overflow-hidden rounded-lg border"
            onClick={() => openAt(i)}
            aria-label={`Open screenshot ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${altBase} ${i + 1}`}
              width={1200}
              height={800}
              className="w-full aspect-[16/10] object-cover transition-transform group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <div
        className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        />
        {/* panel */}
        <div
          role="dialog"
          aria-modal="true"
          className={`absolute inset-0 flex items-center justify-center p-4 sm:p-8 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative max-w-6xl w-full">
            {/* close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute -top-10 right-0 rounded p-2 text-white/90 hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* nav left/right */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded p-2 text-white/90 hover:bg-white/10"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded p-2 text-white/90 hover:bg-white/10"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}

            {/* image */}
            <div className="mx-10 sm:mx-12">
              <Image
                src={images[idx]}
                alt={`${altBase} ${idx + 1}`}
                width={1920}
                height={1200}
                className="w-full max-h-[80vh] object-contain rounded-lg"
                priority
              />
              <div className="mt-2 text-center text-sm text-white/80">
                {idx + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
