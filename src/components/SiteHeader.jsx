"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

export default function SiteHeader() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // prevent background scroll when drawer open
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
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-14 px-4 sm:px-6">
        {/* 3 columns: left (burger/brand on md), center (brand / desktop nav), right (actions) */}
        <div className="grid h-full grid-cols-3 items-center">
          {/* Left: burger (mobile) + brand (desktop) */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="md:hidden -ml-1 h-9 w-9 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 grid place-items-center"
              aria-label={t("openMenu") || "Open menu"}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            {/* brand (desktop) */}
            <Link
              href={`/${locale}`}
              className="hidden md:inline font-semibold truncate"
            >
              Ricky Lau
            </Link>
          </div>

          {/* Center: brand (mobile) or desktop nav */}
          <div className="flex items-center justify-center">
            {/* brand (mobile) */}
            <Link
              href={`/${locale}`}
              className="font-semibold md:hidden truncate"
            >
              Ricky Lau
            </Link>

            {/* desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors ${
                      active
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <ThemeToggle />
            <LanguageSwitch locale={locale} />
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        {/* panel */}
        <aside
          role="dialog"
          aria-modal="true"
          className={`absolute left-0 top-0 h-full w-[86%] max-w-xs bg-background shadow-xl
                      transition-transform duration-300 ease-out
                      ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 h-14 border-b">
            <span className="font-semibold">Ricky Lau</span>
            <button
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
              aria-label={t("closeMenu") || "Close menu"}
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="px-2 py-2 bg-white">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-base transition-colors ${
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
        </aside>
      </div>
    </header>
  );
}
