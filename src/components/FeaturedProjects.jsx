"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

/* Resolve slug from Contentlayer doc */
function slugOf(item) {
  return (
    item?.slug ||
    item?.slugAsParams ||
    item?._raw?.flattenedPath?.split("/").pop() ||
    ""
  );
}

/* Spotlight card (shallow height) */
function Spotlight({ item, locale }) {
  const slug = slugOf(item);
  if (!slug) return null;

  return (
    <Link
      href={`/${locale}/projects/${slug}`}
      className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 shadow-sm hover:shadow-md transition"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={item.cover}
          alt={`${item.title} cover`}
          fill
          sizes="(min-width:1024px) 32vw, 80vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="text-white text-lg sm:text-xl font-semibold line-clamp-2 drop-shadow">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

/* Mini tile (even shorter) */
function Mini({ item, locale }) {
  const slug = slugOf(item);
  if (!slug) return null;

  return (
    <Link
      href={`/${locale}/projects/${slug}`}
      className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 shadow-sm hover:shadow-md transition"
    >
      <div className="relative aspect-[24/9]">
        <Image
          src={item.cover}
          alt={`${item.title} cover`}
          fill
          sizes="(min-width:1024px) 32vw, 80vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/25 to-transparent">
          <h4 className="text-white text-sm font-medium line-clamp-2">
            {item.title}
          </h4>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProjects({ items = [] }) {
  const t = useTranslations("home");
  const locale = useLocale();

  // Use 3 items for a single-row layout on desktop
  const [a, b, c] = items.slice(0, 3);

  return (
    <section className="mt-12">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl sm:text-2xl font-bold">{t("featuredTitle")}</h2>
        <Link
          href={`/${locale}/projects`}
          className="text-sm underline underline-offset-4"
        >
          {t("viewAll")}
        </Link>
      </div>

      {/* Desktop: one row (spotlight + two minis) */}
      <div className="mt-4 hidden md:grid grid-cols-12 gap-4">
        {a && (
          <div className="col-span-7">
            <Spotlight item={a} locale={locale} />
          </div>
        )}
        <div className="col-span-5 grid grid-rows-2 gap-4">
          {b && <Mini item={b} locale={locale} />}
          {c && <Mini item={c} locale={locale} />}
        </div>
      </div>

      {/* Mobile: short horizontal rail with snap */}
      <div className="mt-4 md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory">
        {items.slice(0, 6).map((it) => (
          <div
            key={it._id || slugOf(it)}
            className="snap-start shrink-0 w-[80%] xs:w-[70%] sm:w-[65%]"
            style={{ scrollMargin: 16 }}
          >
            <Mini item={it} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  );
}
