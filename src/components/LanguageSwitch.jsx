"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function stripLocalePrefix(path) {
  return path.replace(/^\/(en|zh)(?=\/|$)/, "") || "/";
}

export default function LanguageSwitch({ locale }) {
  const pathname = usePathname() || "/";
  const pathNoLocale = stripLocalePrefix(pathname);

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/en${pathNoLocale}`}
        className={locale === "en" ? "underline" : ""}
      >
        EN
      </Link>
      <span>/</span>
      <Link
        href={`/zh${pathNoLocale}`}
        className={locale === "zh" ? "underline" : ""}
      >
        中文
      </Link>
    </div>
  );
}
