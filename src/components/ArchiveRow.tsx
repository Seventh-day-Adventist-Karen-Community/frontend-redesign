import { Download, ExternalLink, FileText } from "lucide-react";
import type { PeriodType } from "@/data/bulletin";
import type { ArchiveItem } from "@/data/archive";

export const TYPE_LABEL: Record<PeriodType, string> = {
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly",
};

// One past bulletin: what it is, and View / Download buttons for its PDF.
export default function ArchiveRow({ item }: { item: ArchiveItem }) {
  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600">
          <FileText size={20} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
              {TYPE_LABEL[item.periodType]}
            </span>
            <span className="text-xs text-gray-400">{item.dateLabel}</span>
          </div>
          <h3 className="font-semibold leading-snug text-gray-900">{item.title}</h3>
          {item.theme && <p className="text-sm font-medium text-maroon-700">{item.theme}</p>}
          <p className="mt-0.5 line-clamp-2 text-sm text-gray-500">{item.summary}</p>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <a
          href={item.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-maroon-700 px-4 py-2 text-xs font-semibold text-maroon-700 transition-colors hover:bg-maroon-700 hover:text-white"
        >
          <ExternalLink size={14} /> View
        </a>
        <a
          href={item.pdf}
          download
          className="inline-flex items-center gap-1.5 rounded-full bg-maroon-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-maroon-700"
        >
          <Download size={14} /> PDF{item.size ? ` · ${item.size}` : ""}
        </a>
      </div>
    </li>
  );
}
