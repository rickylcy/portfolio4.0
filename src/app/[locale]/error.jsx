"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  const locale = useLocale();
  const isZh = locale === "zh";

  useEffect(() => {
    // Optional: log to monitoring
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold">
        {isZh ? "出現錯誤" : "Something went wrong"}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {isZh
          ? "抱歉，發生了未知錯誤。"
          : "Sorry, an unexpected error occurred."}
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 h-11 rounded-lg border hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          {isZh ? "重試" : "Try again"}
        </button>
        <Link
          href={`/${locale}`}
          className="px-4 h-11 rounded-lg border hover:bg-gray-100 dark:hover:bg-zinc-800 inline-flex items-center"
        >
          {isZh ? "回首頁" : "Back to Home"}
        </Link>
      </div>
    </main>
  );
}
