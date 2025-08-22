"use client";

import { useEffect, useState } from "react";
import { X, Contrast, MoveDiagonal, Underline, Focus } from "lucide-react";
import { FaWheelchair } from "react-icons/fa";

import { useA11yStore } from "@/store/useA11yStore";

function Toggle({ id, label, checked, onChange, icon }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between gap-3 py-2"
    >
      <span className="flex items-center gap-2 text-sm">
        {icon}
        {label}
      </span>
      <input
        id={id}
        type="checkbox"
        className="h-5 w-5 accent-zinc-900 dark:accent-zinc-100"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export default function A11yFab() {
  const [open, setOpen] = useState(false);

  const {
    textScale,
    highContrast,
    reduceMotion,
    underlineLinks,
    alwaysShowFocus,
    lineHeight,
    set,
    reset,
  } = useA11yStore();

  // prevent body scroll when open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => (document.body.style.overflow = prev || "");
  }, [open]);

  return (
    <>
      <button
        aria-label="Accessibility options"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="
    fixed bottom-5 right-5 z-40
    group
    rounded-full p-[2px]
    bg-gradient-to-b from-sky-400/50 via-blue-500/30 to-indigo-500/40
dark:from-sky-400/30 dark:via-blue-500/20 dark:to-indigo-500/30 

  "
      >
        <span
          className="
      grid h-12 w-12 place-items-center
      rounded-full
      bg-white/90 dark:bg-zinc-900/90
      border border-white/40 dark:border-black/30
      shadow-lg backdrop-blur 
    "
        >
          <FaWheelchair className="h-7 w-7 transition-transform group-hover:scale-110 " />
        </span>
      </button>

      {/* Overlay + Panel */}
      <div
        className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility"
          className={`absolute right-0 bottom-0 top-auto mb-5 mr-5 w-[92vw] max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur shadow-xl transition-transform duration-300 ease-out
                     ${
                       open
                         ? "translate-y-0"
                         : "translate-y-5 opacity-0 pointer-events-none"
                     }`}
        >
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 h-12">
            <div className="font-medium">Accessibility</div>
            <button
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4">
            {/* Text size */}
            <div className="mb-3">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-2">
                Text size
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => set({ textScale: "normal" })}
                  className={`h-8 rounded-lg border px-3 text-sm ${
                    textScale === "normal"
                      ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => set({ textScale: "large" })}
                  className={`h-8 rounded-lg border px-3 text-sm ${
                    textScale === "large"
                      ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div className="mt-4 space-y-1">
              <Toggle
                id="a11y-contrast"
                label="High contrast text & borders"
                checked={highContrast}
                onChange={(v) => set({ highContrast: v })}
                icon={<Contrast className="h-4 w-4 text-zinc-500" />}
              />
              <Toggle
                id="a11y-reduce"
                label="Reduce motion / animations"
                checked={reduceMotion}
                onChange={(v) => set({ reduceMotion: v })}
                icon={<MoveDiagonal className="h-4 w-4 text-zinc-500" />}
              />
              <Toggle
                id="a11y-underline"
                label="Underline all links"
                checked={underlineLinks}
                onChange={(v) => set({ underlineLinks: v })}
                icon={<Underline className="h-4 w-4 text-zinc-500" />}
              />
              <Toggle
                id="a11y-focus"
                label="Always show focus outline"
                checked={alwaysShowFocus}
                onChange={(v) => set({ alwaysShowFocus: v })}
                icon={<Focus className="h-4 w-4 text-zinc-500" />}
              />
              <label
                htmlFor="a11y-line"
                className="flex items-center justify-between gap-3 py-2"
              >
                <span className="flex items-center gap-2 text-sm">
                  <span className="h-4 w-4 rounded-full border border-zinc-400/70" />
                  Spacious line height
                </span>
                <select
                  id="a11y-line"
                  value={lineHeight}
                  onChange={(e) => set({ lineHeight: e.target.value })}
                  className="h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-2 text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="spacious">Spacious</option>
                </select>
              </label>
            </div>

            {/* Reset */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => reset()}
                className="h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Reset
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
