"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ item }) {
  const locale = useLocale();
  // be resilient to different contentlayer field names
  const slug =
    item?.slug ||
    item?.slugAsParams ||
    item?._raw?.flattenedPath?.split("/").pop();

  if (!item || !slug) return null;

  return (
    <Link href={`/${locale}/projects/${slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border bg-card">
        <Image
          src={item.cover}
          alt={`${item.title} cover`}
          width={1200}
          height={750}
          className="aspect-[16/10] w-full object-contain transition-transform group-hover:scale-[1.02]"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          {item.description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
