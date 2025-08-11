export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "../../../components/resume/ResumePDF";
import { getResumeData } from "../../../content/resume";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const locale = (searchParams.get("locale") || "en").toLowerCase();
  const data = getResumeData(locale);

  const blob = await pdf(<ResumePDF data={data} />).toBuffer();
  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=Ricky-Lau-Resume-${locale}.pdf`,
    },
  });
}
