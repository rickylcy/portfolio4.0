import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "zh"];
export const defaultLocale = "en"; // ✅ required for 'as-needed'

export const { Link, useRouter, usePathname, redirect } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
