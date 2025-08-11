"use client";
import { useTranslations } from "next-intl";
import { useProjectFilterStore } from "../store/useProjectFilterStore";

const ALL_TAGS = [
  "Web",
  "Mobile-Web",
  "Responsive",
  "POS",
  "Data-Viz",
  "Kiosk",
  "Production",
  "Self-Learning",
];

export default function ProjectFilters() {
  const t = useTranslations("filters");
  const { query, selectedTags, status, setQuery, toggleTag, setStatus, reset } =
    useProjectFilterStore();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        {/* Search */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            {t("search")}
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-10 w-64 rounded-md border bg-transparent px-3"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            {t("status")}
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 rounded-md border bg-transparent px-3"
          >
            <option value="all">{t("all")}</option>
            <option value="completed">{t("completed")}</option>
            <option value="in-progress">{t("inProgress")}</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {ALL_TAGS.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-xs rounded-full border px-2 py-1 transition ${
                active
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              {tag}
            </button>
          );
        })}
        <button
          onClick={reset}
          className="text-xs rounded-full border px-2 py-1"
        >
          {t("reset")}
        </button>
      </div>
    </div>
  );
}
