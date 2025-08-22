"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Server, Wrench, CheckCircle2 } from "lucide-react";
import { skills } from "@/content/skills";

/* UI bits */
function LevelPill({ label }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300/70 dark:border-zinc-700/70 px-2 py-0.5 text-[11px] text-zinc-600 dark:text-zinc-300 bg-white/70 dark:bg-zinc-900/40">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500/70 dark:bg-zinc-400/70" />
      {label}
    </span>
  );
}

function Card({ title, icon, children }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border
                 border-zinc-200/80 dark:border-zinc-800/80
                 bg-gradient-to-b from-zinc-50 to-white
                 dark:from-zinc-900/40 dark:to-zinc-900/10
                 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full bg-zinc-200/40 dark:bg-white/5 blur-2xl" />
      <header className="flex items-center gap-3 p-5 border-b border-zinc-200/70 dark:border-zinc-800/70">
        <div className="grid place-items-center h-9 w-9 rounded-xl border border-zinc-300/70 dark:border-zinc-700/70 bg-white/70 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-200">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
      </header>
      <div className="p-5">{children}</div>
    </div>
  );
}

function SkillList({ items, t }) {
  const reduce = useReducedMotion();
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <motion.li
          key={it.name}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.02 }}
          className="group/row flex items-center justify-between gap-3 rounded-lg
                     border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-800/80
                     bg-white/40 dark:bg-zinc-900/30 px-3 py-2 transition-colors"
        >
          <span className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            <CheckCircle2 className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span className="font-medium">{it.name}</span>
          </span>
          <LevelPill label={t(`levels.${it.level}`)} />
        </motion.li>
      ))}
    </ul>
  );
}

export default function SkillsSection() {
  const t = useTranslations("skills");
  return (
    <section className="mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {t("title")}
        </h2>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">{t("subtitle")}</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card title={t("frontend")} icon={<Code2 className="h-5 w-5" />}>
          <SkillList items={skills.frontend} t={t} />
        </Card>
        <Card title={t("backend")} icon={<Server className="h-5 w-5" />}>
          <SkillList items={skills.backend} t={t} />
        </Card>
        <Card title={t("tooling")} icon={<Wrench className="h-5 w-5" />}>
          <SkillList items={skills.tooling} t={t} />
        </Card>
      </div>
    </section>
  );
}
