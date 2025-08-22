// server component (no "use client")
export default function LighthouseBadges({
  scores = { performance: 95, accessibility: 100, bestPractices: 100, seo: 98 },
  labels = {
    performance: "Performance",
    accessibility: "Accessibility",
    bestPractices: "Best Practices",
    seo: "SEO",
    title: "Lighthouse",
  },
}) {
  const entries = [
    ["performance", scores.performance, labels.performance],
    ["accessibility", scores.accessibility, labels.accessibility],
    ["bestPractices", scores.bestPractices, labels.bestPractices],
    ["seo", scores.seo, labels.seo],
  ];

  const color = (v) => (v >= 90 ? "#16a34a" : v >= 50 ? "#f59e0b" : "#dc2626"); // green/amber/red

  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        {labels.title}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {entries.map(([key, value, label]) => {
          const deg = Math.max(0, Math.min(100, Number(value || 0))) * 3.6;
          return (
            <div
              key={key}
              className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/30 p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div
                  className="grid place-items-center h-14 w-14 rounded-full text-sm font-semibold"
                  style={{
                    backgroundImage: `conic-gradient(${color(
                      value
                    )} ${deg}deg, rgba(0,0,0,0.08) 0)`,
                  }}
                >
                  <div className="grid place-items-center h-12 w-12 rounded-full bg-white dark:bg-zinc-900">
                    {Math.round(value)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {label}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                    {key}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Scores measured locally. Results vary by network/device.
      </p>
    </section>
  );
}
