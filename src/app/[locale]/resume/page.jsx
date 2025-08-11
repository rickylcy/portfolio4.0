import { getTranslations } from "next-intl/server";
import Resume from "../../../components/resume/Resume";
import { getResumeData } from "../../../content/resume";
import ResumeActions from "../../../components/resume/ResumeActions";

export default async function ResumePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resumePage" });
  const data = getResumeData(locale);

  const pdfHref = `/api/resume?locale=${locale}`;
  const backHref = `/${locale}`;

  return (
    <main className="container mx-auto p-6 print:p-0">
      <div className="mx-auto max-w-3xl bg-white dark:bg-zinc-900 shadow rounded-2xl p-6 print:shadow-none print:rounded-none">
        <Resume data={data} />
      </div>

      <ResumeActions
        pdfHref={pdfHref}
        downloadText={t("download")}
        printText={t("print")}
        backHref={backHref}
        backText={t("backHome")}
      />
    </main>
  );
}
