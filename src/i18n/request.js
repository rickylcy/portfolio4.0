import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const lc = (locale ?? "en").toLowerCase();
  const supported = new Set(["en", "zh"]);
  const safe = supported.has(lc) ? lc : "en";

  const messages = (await import(`../messages/${safe}.json`)).default;

  // ✅ Must return BOTH locale and messages
  return { locale: safe, messages };
});
