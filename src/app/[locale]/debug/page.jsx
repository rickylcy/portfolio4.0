import { getLocale } from "next-intl/server";
export default async function Debug() {
  const locale = await getLocale();
  return <pre className="p-6">Active locale: {locale}</pre>;
}
