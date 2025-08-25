import { getTranslations } from "next-intl/server";
import Link from "next/link";
import AnimatedButton from "../../components/AnimatedButton";
import FeaturedProjects from "../../components/FeaturedProjects";
import { getProjectsByLocale } from "../../lib/projects";
import ResumePreviewCard from "../../components/ResumePreviewCard";
import SkillsSection from "@/components/SkillsSection";
import LighthouseBadges from "../../components/home/LighthouseBadges";
import A11yChecklist from "../../components/home/A11yChecklist";

export default async function HomePage({ params }) {
  const { locale } = await params;

  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const items = getProjectsByLocale(locale).slice(0, 3);

  return (
    <main className="container mx-auto px-6 py-16">
      {/* Hero */}
      <h1 className="text-4xl md:text-5xl font-bold">{tHero("title")}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{tHero("subtitle")}</p>
      <div className="mt-8 flex gap-4">
        <Link href={`/${locale}/projects`}>
          <AnimatedButton size="lg">{tHero("cta")}</AnimatedButton>
        </Link>
      </div>

      {/* Featured */}
      <FeaturedProjects items={items} />

      <SkillsSection />

      {/* Resume preview */}
      <ResumePreviewCard
        locale={locale}
        labels={{
          title: tHome("resumeTitle"),
          blurb: tHome("resumeBlurb"),
          view: tHome("viewResume"),
          download: tHome("downloadResume"),
        }}
      />
    </main>
  );
}
