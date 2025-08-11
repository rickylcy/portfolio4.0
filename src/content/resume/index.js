const en = {
  header: {
    name: "Ricky Lau",
    title: "Full-stack Developer",
    meta: "Brisbane • ricky@example.com • github.com/rickylcy • linkedin.com/in/ching-yin-lau-457825206",
  },
  summary:
    "Full-stack developer focused on Next.js + Tailwind and production POS/ordering systems. Passionate about clean UI, fast UX, and shipping pragmatic solutions.",
  sections: [
    {
      heading: "Experience",
      items: [
        {
          title: "POS Republic — Software Developer",
          period: "Oct 2022 → Present",
          bullets: [
            "Built Mobile Ordering and Customer Display (second screen) used in live stores.",
            "Integrated kitchen printing/label printing and refined receipt formatting (ESC/POS).",
            "Created Sales Report web app with responsive dashboards.",
          ],
        },
      ],
    },
    {
      heading: "Projects",
      items: [
        {
          title: "Realtime Chat App (Firebase)",
          bullets: [
            "Responsive chat with auth and real-time messaging; deployed on Vercel.",
          ],
        },
        {
          title: "Amherst Platform (Sushi)",
          bullets: [
            "Ordering portal: authentication, checkout, and admin panels (in progress).",
          ],
        },
        {
          title: "Scheduling Web App",
          bullets: [
            "Configurable time slots, drag-and-drop jobs, MySQL + Node API.",
          ],
        },
      ],
    },
    {
      heading: "Skills",
      items: [
        {
          title: "Core",
          bullets: [
            "Next.js, React, Tailwind, shadcn/ui, Node.js/Express, SQL, Firebase",
          ],
        },
        {
          title: "Also",
          bullets: [
            "MUI/Joy UI, Chart libs, i18n, PDF/printing, POS integrations",
          ],
        },
      ],
    },
  ],
};

const zh = {
  header: {
    name: "Ricky Lau",
    title: "全端開發者",
    meta: "布里斯本 • ricky@example.com • github.com/rickylcy • linkedin.com/in/ching-yin-lau-457825206",
  },
  summary:
    "專注 Next.js + Tailwind 的全端開發者，擅長 POS/點餐系統落地。重視清晰介面、快速體驗與務實交付。",
  sections: [
    {
      heading: "經歷",
      items: [
        {
          title: "POS Republic — 軟體開發者",
          period: "2022/10 → 至今",
          bullets: [
            "打造行動點餐與第二顯示螢幕（門市實際使用）。",
            "整合廚房與標籤列印、優化收據格式（ESC/POS）。",
            "開發銷售報表網站，具備響應式儀表板。",
          ],
        },
      ],
    },
    {
      heading: "專案",
      items: [
        {
          title: "即時聊天應用（Firebase）",
          bullets: ["響應式聊天，支援登入與即時訊息；部署於 Vercel。"],
        },
        {
          title: "Amherst 平台（壽司點餐）",
          bullets: ["點餐入口：登入、結帳、後台管理（進行中）。"],
        },
        {
          title: "排程系統",
          bullets: ["可配置時段、拖放任務，MySQL + Node API。"],
        },
      ],
    },
    {
      heading: "技能",
      items: [
        {
          title: "核心",
          bullets: [
            "Next.js、React、Tailwind、shadcn/ui、Node.js/Express、SQL、Firebase",
          ],
        },
        {
          title: "其他",
          bullets: ["MUI/Joy UI、圖表庫、i18n、PDF/列印、POS 整合"],
        },
      ],
    },
  ],
};

export function getResumeData(locale = "en") {
  return locale === "zh" ? zh : en;
}
