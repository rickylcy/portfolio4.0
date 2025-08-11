"use client";
import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useProjectFilterStore } from "../store/useProjectFilterStore";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({ items, isContentlayer = false }) {
  const t = useTranslations("filters");
  const locale = useLocale();
  const { query, selectedTags, status } = useProjectFilterStore();

  const list = useMemo(() => {
    let arr = items;

    // Normalize for filters (title/subtitle/tags/status access)
    const getTitle = (p) =>
      isContentlayer ? p.title : p.i18n?.en?.title || "";
    const getSubtitle = (p) =>
      isContentlayer ? p.subtitle : p.i18n?.en?.subtitle || "";
    const getTags = (p) => (isContentlayer ? p.tags || [] : p.tags || []);
    const getStatus = (p) => (isContentlayer ? p.status : p.status);

    if (status !== "all") arr = arr.filter((p) => getStatus(p) === status);
    if (selectedTags.length)
      arr = arr.filter((p) =>
        selectedTags.every((tg) => getTags(p).includes(tg))
      );

    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (p) =>
          getTitle(p).toLowerCase().includes(q) ||
          getSubtitle(p).toLowerCase().includes(q) ||
          getTags(p).join(" ").toLowerCase().includes(q)
      );
    }
    return arr;
  }, [items, query, selectedTags, status, isContentlayer]);

  if (!list.length)
    return (
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        {t("noResults")}
      </p>
    );

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => (
        <ProjectCard
          key={isContentlayer ? p._id : p.slug}
          item={p}
          locale={locale}
          isContentlayer={isContentlayer}
        />
      ))}
    </div>
  );
}
