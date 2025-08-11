import { getTranslations } from "next-intl/server";
import { about } from "../../../content/about";
import MotionSection from "../../../components/MotionSection";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const data = about[locale] || about.en;

  return (
    <main className="container mx-auto px-6 py-12">
      <MotionSection as="header">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{data.intro}</p>
      </MotionSection>

      <MotionSection className="mt-8" delay={0.05}>
        <h2 className="text-xl font-semibold">
          {locale === "zh" ? "技能" : "Skills"}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.skills.core.map((s) => (
            <span key={s} className="text-xs rounded-full border px-2 py-1">
              {s}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {(locale === "zh" ? "其他：" : "Also: ") +
            data.skills.also.join(", ")}
        </p>
      </MotionSection>

      <MotionSection className="mt-10" delay={0.1}>
        <h2 className="text-xl font-semibold">
          {locale === "zh" ? "時間軸" : "Timeline"}
        </h2>
        <ol className="mt-4 border-l pl-5 space-y-6">
          {data.timeline.map((item, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-2 top-1.5 h-3 w-3 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.period}
              </div>
              <div className="font-medium">
                {item.role} · {item.org}
              </div>
              <ul className="mt-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                {item.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </MotionSection>
    </main>
  );
}
