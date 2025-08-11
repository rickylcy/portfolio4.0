"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useUIStore } from "../store/useUIStore";

export default function MobileMenu() {
  const { mobileNavOpen, closeMobileNav } = useUIStore();
  const locale = useLocale();

  return (
    <div
      className={`fixed inset-0 z-50 ${
        mobileNavOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!mobileNavOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          mobileNavOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeMobileNav}
      />
      <nav
        className={`absolute right-0 top-0 h-full w-72 bg-white dark:bg-zinc-900 border-l p-6 transition-transform
        ${mobileNavOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button className="mb-6 text-sm underline" onClick={closeMobileNav}>
          Close
        </button>
        <ul className="space-y-4 text-base">
          <li>
            <Link href={`/${locale}/projects`} onClick={closeMobileNav}>
              Projects
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/about`} onClick={closeMobileNav}>
              About
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/contact`} onClick={closeMobileNav}>
              Contact
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/resume`} onClick={closeMobileNav}>
              Resume
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
