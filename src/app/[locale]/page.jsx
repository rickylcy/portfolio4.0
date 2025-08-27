import { getTranslations } from "next-intl/server";
import Link from "next/link";
import AnimatedButton from "../../components/AnimatedButton";
import FeaturedProjects from "../../components/FeaturedProjects";
import {
  getFeaturedProjectsByLocale,
  getProjectsByLocale,
} from "../../lib/projects";
import ResumePreviewCard from "../../components/ResumePreviewCard";
import SkillsSection from "@/components/SkillsSection";
import LighthouseBadges from "../../components/home/LighthouseBadges";
import A11yChecklist from "../../components/home/A11yChecklist";
import Image from "next/image";

export default async function HomePage({ params }) {
  const { locale } = await params;

  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const items = getFeaturedProjectsByLocale(locale, 3);

  return (
    <main className="container mx-auto px-6 py-16">
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-2">
        {/* Left: copy + CTA */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">{tHero("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {tHero("subtitle")}
          </p>
          <div className="mt-8 flex gap-4">
            <Link href={`/${locale}/projects`}>
              <AnimatedButton size="lg">{tHero("cta")}</AnimatedButton>
            </Link>
          </div>
        </div>

        {/* Right: morphing photo */}
        <div className="relative mx-auto w-full max-w-[420px] md:max-w-[480px]">
          {/* soft glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-[36px] bg-gradient-to-tr from-primary/25 to-accent/25 blur-3xl opacity-70 dark:opacity-50"
          />

          {/* photo wrapper */}
          <div className="relative aspect-square overflow-hidden">
            {/* glassy backing that morphs */}
            <div className="absolute inset-0 hero-blob hero-blob-ring bg-card/60 backdrop-blur-sm border border-border animate-blob" />

            {/* the image morphs with the backing so edges match */}
            <Image
              src="/ricky.jpg" // /public/photo.jpg
              alt="Portrait of Ricky Lau"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="hero-blob animate-blob object-cover"
            />
          </div>
        </div>
      </section>

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
