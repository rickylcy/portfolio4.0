import { getTranslations } from "next-intl/server";
import ContactForm from "../../../components/ContactForm";

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{t("subtitle")}</p>

      <div className="mt-8">
        <ContactForm /> {/* no t prop */}
      </div>
    </main>
  );
}
