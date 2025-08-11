"use client";
import Link from "next/link";

export default function ResumeActions({
  pdfHref,
  downloadText,
  printText,
  backHref,
  backText,
}) {
  return (
    <div className="mt-4 flex gap-3 print:hidden">
      <a
        href={pdfHref}
        className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        {downloadText}
      </a>
      <button
        onClick={() => window.print()}
        className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        {printText}
      </button>
      <Link href={backHref} className="ml-auto text-sm underline">
        {backText}
      </Link>
    </div>
  );
}
