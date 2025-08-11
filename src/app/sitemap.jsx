import { projects } from "../content/projects/data";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locales = ["en", "zh"];

  const staticRoutes = ["", "/projects", "/about", "/contact", "/resume"];
  const pages = locales.flatMap((loc) =>
    staticRoutes.map((r) => ({
      url: `${base}/${loc}${r}`,
      lastModified: new Date().toISOString(),
    }))
  );

  const projectPages = locales.flatMap((loc) =>
    projects.map((p) => ({
      url: `${base}/${loc}/projects/${p.slug}`,
      lastModified: new Date().toISOString(),
    }))
  );

  return [...pages, ...projectPages];
}
