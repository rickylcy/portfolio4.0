import Link from "next/link";
import { getLocale } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const isZh = locale === "zh";
  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold">
        {isZh ? "找不到頁面" : "Page not found"}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {isZh
          ? "您要找的頁面不存在或已移除。"
          : "The page you’re looking for doesn’t exist."}
      </p>
      <Link href={`/${locale}`} className="mt-6 inline-block underline">
        {isZh ? "回首頁" : "Back to Home"}
      </Link>
    </main>
  );
}
