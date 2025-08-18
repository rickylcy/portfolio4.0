import Link from "next/link";

export default function ResumePreviewCard({ locale, labels }) {
  const pdfHref = `/api/resume?locale=${locale}`;

  return (
    <section className="mt-16">
      <div className="flex items-center gap-6 rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
        {/* Optional static thumbnail placed in /public */}
        <img
          src="/resume-thumb.png"
          alt="Resume preview"
          className="hidden h-52 w-40 shrink-0 rounded-lg object-cover shadow sm:block"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{labels.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{labels.blurb}</p>
          <div className="mt-4 flex gap-3">
            <Link
              href={`/${locale}/resume`}
              className="inline-flex h-10 items-center rounded-lg border px-4 hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              {labels.view}
            </Link>
            <a
              href={pdfHref}
              className="inline-flex h-10 items-center rounded-lg border px-4 hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              {labels.download}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
