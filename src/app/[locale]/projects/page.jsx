import { getTranslations } from "next-intl/server";
import { getProjectsByLocale } from "../../../lib/projects";
import ProjectFilters from "../../../components/ProjectFilters";
import ProjectsGrid from "../../../components/ProjectsGrid";

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const items = getProjectsByLocale(locale);

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{t("subtitle")}</p>

      <div className="mt-6">
        <ProjectFilters />
        <ProjectsGrid items={items} isContentlayer />
      </div>
    </main>
  );
}
