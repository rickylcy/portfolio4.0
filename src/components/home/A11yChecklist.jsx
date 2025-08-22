// server component (no JS required)
import { CheckCircle2 } from "lucide-react";

function Row({ children }) {
  return (
    <li className="flex items-start gap-2 rounded-lg border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/30 p-3">
      <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600 dark:text-green-500 shrink-0" />
      <span className="text-sm text-zinc-700 dark:text-zinc-200">
        {children}
      </span>
    </li>
  );
}

export default function A11yChecklist({ title = "Accessibility checklist" }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        <Row>Semantic landmarks (header, nav, main, footer)</Row>
        <Row>Keyboard navigation and visible focus</Row>
        <Row>Color contrast meets WCAG AA</Row>
        <Row>Alt text for informative images</Row>
        <Row>Form fields have labels &amp; errors</Row>
        <Row>Reduced motion respected for animations</Row>
        <Row>Links/buttons use accessible names</Row>
        <Row>
          Announce async states with <code>aria-live</code>
        </Row>
      </ul>
    </section>
  );
}
