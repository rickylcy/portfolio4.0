"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects({ items }) {
  const t = useTranslations("home");
  const locale = useLocale();
  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold">{t("featuredTitle")}</h2>
        <Link href={`/${locale}/projects`} className="text-sm underline">
          {t("viewAll")}
        </Link>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProjectCard key={p._id} item={p} locale={locale} isContentlayer />
        ))}
      </div>
    </section>
  );
}
