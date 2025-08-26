import { allProjects } from "contentlayer/generated";

// get a consistent slug
function getSlug(p) {
  return p.slug || p.slugAsParams || p._raw?.flattenedPath?.split("/").pop();
}

// Featured across locales: if any locale marks a slug as featured, treat both as featured
function getFeaturedSlugSet() {
  return new Set(allProjects.filter((p) => p.featured).map((p) => getSlug(p)));
}

// Featured for a locale, ordered by featuredRank then date
export function getFeaturedProjectsByLocale(locale, limit = 3) {
  const featuredSlugs = getFeaturedSlugSet();

  const items = allProjects
    .filter((p) => p.locale === locale)
    .filter((p) => (featuredSlugs.size ? featuredSlugs.has(getSlug(p)) : true)) // if none flagged, fall back to all
    .map((p) => ({ ...p, slug: getSlug(p) }))
    .sort((a, b) => {
      const ar = a.featuredRank ?? 9999;
      const br = b.featuredRank ?? 9999;
      if (ar !== br) return ar - br;
      return new Date(b.date || 0) - new Date(a.date || 0);
    });

  // If nothing is flagged featured, fall back to newest
  const list = featuredSlugs.size ? items : getProjectsByLocale(locale);
  return list.slice(0, limit);
}

// Keep only this locale & ensure a `slug` field exists
export function getProjectsByLocale(locale) {
  return allProjects
    .filter((p) => p.locale === locale)
    .map((p) => ({ ...p, slug: getSlug(p) }))
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

export function getProject(locale, slug) {
  const s = String(slug || "");
  return getProjectsByLocale(locale).find((p) => p.slug === s) || null;
}

// For generateStaticParams – return all locale/slug pairs
export function getAllLocaleSlugPairs() {
  return allProjects.map((p) => ({ locale: p.locale, slug: getSlug(p) }));
}

// Find the opposite-locale twin and return a URL for it
export function getTwin(project) {
  if (!project) return null;
  const slug = getSlug(project);
  const twin = allProjects.find(
    (p) => getSlug(p) === slug && p.locale !== project.locale
  );
  return twin
    ? { locale: twin.locale, url: `/${twin.locale}/projects/${getSlug(twin)}` }
    : null;
}
