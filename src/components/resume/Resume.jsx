import { useTranslations } from "next-intl";

export default function Resume({ data }) {
  const t = useTranslations("resume");
  return (
    <article className="prose dark:prose-invert max-w-none">
      <header>
        <h1 className="!mb-1">{data.header.name}</h1>
        <p className="!mt-0 text-sm">{data.header.title}</p>
        <p className="!mt-1 text-xs opacity-80">{data.header.meta}</p>
      </header>

      <section>
        <h2>{t("summary")}</h2>
        <p>{data.summary}</p>
      </section>

      {data.sections.map((sec, i) => (
        <section key={i}>
          <h2>{sec.heading}</h2>
          {sec.items.map((it, j) => (
            <div key={j} className="mb-4">
              <p className="font-semibold">
                {it.title}{" "}
                {it.period ? (
                  <span className="font-normal opacity-70">• {it.period}</span>
                ) : null}
              </p>
              {it.bullets && (
                <ul className="mt-2">
                  {it.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}
    </article>
  );
}
