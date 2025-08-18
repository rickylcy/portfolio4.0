"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const FALLBACK =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="100%" height="100%" fill="#e5e7eb"/></svg>'
  );

export default function ProjectCard({
  item,
  locale = "en",
  isContentlayer = false,
}) {
  const reduce = useReducedMotion();

  // Normalize fields for display
  const title = isContentlayer
    ? item.title
    : item.i18n?.[locale]?.title || item.i18n?.en?.title;
  const subtitle = isContentlayer
    ? item.subtitle
    : item.i18n?.[locale]?.subtitle || item.i18n?.en?.subtitle;
  const status = isContentlayer ? item.status : item.status;
  const tags = isContentlayer ? item.tags || [] : item.tags || [];
  const cover = isContentlayer
    ? item.cover || FALLBACK
    : item.images?.[0] || FALLBACK;
  const href = isContentlayer ? item.url : `/${locale}/projects/${item.slug}`;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={reduce ? {} : { y: -3 }}
      className="group rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition bg-white dark:bg-zinc-900"
    >
      <Link href={href} className="block">
        <div className="relative aspect-video bg-gray-100 dark:bg-zinc-800 overflow-hidden">
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain transition group-hover:scale-105 "
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs rounded-full border px-2 py-0.5 capitalize">
              {status.replace("-", " ")}
            </span>
            {tags.map((tg) => (
              <span
                key={tg}
                className="text-xs rounded-full border px-2 py-0.5"
              >
                {tg}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
