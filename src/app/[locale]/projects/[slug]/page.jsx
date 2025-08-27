import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  getProject,
  getTwin,
  getAllLocaleSlugPairs,
} from "../../../../lib/projects";
import MDXRenderer from "../../../../components/MDXRenderer";
import ProjectGallery from "@/components/projects/ProjectGallery";
import Image from "next/image";

export async function generateStaticParams() {
  // use the same slug normalization as the data layer
  return getAllLocaleSlugPairs();
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProject(locale, slug);
  if (!project) return {};

  const title = `${project.title} – Ricky Lau`;
  const description = project.subtitle || "Project case study";
  const ogUrl = `/api/og?locale=${locale}&title=${encodeURIComponent(
    project.title
  )}&subtitle=${encodeURIComponent(project.subtitle || "")}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: { en: `/en/projects/${slug}`, zh: `/zh/projects/${slug}` },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/projects/${slug}`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

export default async function ProjectDetail({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(locale, slug);
  if (!project) return notFound();

  const twin = getTwin(project);

  return (
    <main className="container mx-auto px-6 py-10">
      <a href={`/${locale}/projects`} className="text-sm underline">
        ← {locale === "zh" ? "返回作品集" : "Back to Projects"}
      </a>

      <header className="mt-4">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        {project.subtitle && (
          <p className="mt-1 text-muted-foreground">{project.subtitle}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {project.status && (
            <span className="text-xs rounded-full border px-2 py-0.5 capitalize">
              {String(project.status).replace("-", " ")}
            </span>
          )}
          {project.tags?.map((tg) => (
            <span key={tg} className="text-xs rounded-full border px-2 py-0.5">
              {tg}
            </span>
          ))}
        </div>

        {project.cover && (
          <div className="mt-6 relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-contain"
            />
          </div>
        )}
      </header>

      <article className="prose dark:prose-invert max-w-none mt-8">
        {project.body?.code ? <MDXRenderer code={project.body.code} /> : null}
      </article>

      {project.links?.demo && (
        <div className="mt-8">
          <a
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            🔗 Live Demo
          </a>
        </div>
      )}

      {twin && (
        <div className="mt-8 text-sm">
          <a className="underline" href={twin.url}>
            {locale === "zh" ? "查看英文版" : "View Chinese version"}
          </a>
        </div>
      )}

      <ProjectGallery
        images={project.screenshots || []}
        altBase={project.title}
      />
    </main>
  );
}
