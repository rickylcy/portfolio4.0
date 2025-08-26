"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

export default function MobileDrawer({ open, onOpenChange, locale, t }) {
  const pathname = usePathname();

  // prevent body scroll when open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => (document.body.style.overflow = prev || "");
  }, [open]);

  const nav = [
    { href: `/${locale}/projects`, label: t("projects") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
    { href: `/${locale}/resume`, label: t("resume") },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => onOpenChange(false)}
      />
      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`absolute left-0 top-0 h-full w-[86%] max-w-xs bg-background shadow-xl transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <span className="font-semibold">Ricky Lau</span>
          <button
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
            onClick={() => onOpenChange(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="px-4 py-3 bg-white">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={`block rounded-lg px-3 py-3 text-base
                  ${
                    active
                      ? "bg-gray-100 dark:bg-zinc-800 font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t px-4 py-3 flex items-center justify-between">
          <LanguageSwitch locale={locale} />
        </div>
      </aside>
    </div>
  );
}
