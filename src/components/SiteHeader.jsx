"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";
import { useUIStore } from "../store/useUIStore";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const { toggleMobileNav } = useUIStore();

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden -ml-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
            aria-label="Open menu"
            onClick={toggleMobileNav}
          >
            ☰
          </button>
          <Link href={`/${locale}`} className="font-semibold">
            Ricky Lau
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href={`/${locale}/projects`}>{t("projects")}</Link>
          <Link href={`/${locale}/about`}>{t("about")}</Link>
          <Link href={`/${locale}/contact`}>{t("contact")}</Link>
          <Link href={`/${locale}/resume`}>{t("resume")}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitch locale={locale} />
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileMenu />
    </header>
  );
}
