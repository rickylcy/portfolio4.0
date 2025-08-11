import { allProjects } from "contentlayer/generated"; // ← keep THIS path

export function getProjectsByLocale(locale) {
  return allProjects
    .filter((p) => p.locale === locale)
    .sort((a, b) => b.date?.localeCompare(a.date || "") || 0);
}

export function getProject(locale, slug) {
  return (
    allProjects.find((p) => p.locale === locale && p.slug === slug) || null
  );
}
