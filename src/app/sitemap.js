import { allProjects } from "contentlayer/generated";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locales = ["en", "zh"];

  // Static pages per locale
  const staticRoutes = ["", "/projects", "/about", "/contact", "/resume"];
  const pages = locales.flatMap((loc) =>
    staticRoutes.map((r) => ({
      url: `${base}/${loc}${r}`,
      lastModified: new Date().toISOString(),
    }))
  );

  // MDX projects already exist per locale in Contentlayer
  const projectPages = allProjects.map((p) => ({
    url: `${base}/${p.locale}/projects/${p.slug}`,
    lastModified: (p.date ? new Date(p.date) : new Date()).toISOString(),
  }));

  return [...pages, ...projectPages];
}
