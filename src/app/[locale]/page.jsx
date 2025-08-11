// src/app/[locale]/page.jsx
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import AnimatedButton from "../../components/AnimatedButton";
import FeaturedProjects from "../../components/FeaturedProjects";
import { getProjectsByLocale } from "../../lib/projects";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const items = getProjectsByLocale(locale).slice(0, 3);

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      <div className="mt-8 flex gap-4">
        <Link href={`/${locale}/projects`}>
          <AnimatedButton size="lg">{t("cta")}</AnimatedButton>
        </Link>
      </div>

      <FeaturedProjects items={items} />
    </main>
  );
}
