"use client";

import { useMemo, useState } from "react";
import { Clock, Download, ExternalLink, FileText, Search, X } from "lucide-react";
import { bulletins, PeriodType } from "@/data/bulletin";
import { archive } from "@/data/archive";
import PageHero from "@/components/PageHero";

const TABS: { key: PeriodType; label: string }[] = [
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "yearly", label: "Yearly" },
];

const TYPE_LABEL: Record<PeriodType, string> = {
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly",
};

const PAGE_SIZE = 8;

const chip = (active: boolean) =>
  `px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
    active
      ? "bg-maroon-600 text-white"
      : "bg-white border border-gray-200 text-gray-600 hover:border-maroon-300"
  }`;

export default function BulletinPage() {
  // Current bulletin
  const [tab, setTab] = useState<PeriodType>("weekly");
  const bulletin = bulletins[tab];

  // Archive
  const [query, setQuery] = useState("");
  const [type, setType] = useState<PeriodType | "all">("all");
  const [year, setYear] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const years = useMemo(
    () => Array.from(new Set(archive.map((a) => a.date.slice(0, 4)))).sort().reverse(),
    []
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: archive.length };
    archive.forEach((a) => (c[a.periodType] = (c[a.periodType] || 0) + 1));
    return c;
  }, []);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return archive.filter((a) => {
      if (type !== "all" && a.periodType !== type) return false;
      if (year !== "all" && !a.date.startsWith(year)) return false;
      if (terms.length === 0) return true;
      const haystack = [a.title, a.theme, a.summary, a.dateLabel, a.periodType, a.date.slice(0, 4)]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
  }, [query, type, year]);

  const filtersActive = query !== "" || type !== "all" || year !== "all";
  const clearFilters = () => {
    setQuery("");
    setType("all");
    setYear("all");
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      <PageHero
        eyebrow="Bulletin"
        title="Church Bulletin"
        description="Everything happening this Sabbath, this month, this quarter, and this year — download the PDF or search past bulletins."
      />

      {/* Current bulletin */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={chip(tab === t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <h2 className="font-serif text-xl sm:text-2xl">{bulletin.label}</h2>
            <span className="text-sm text-gray-500">{bulletin.dateRange}</span>
          </div>

          {bulletin.sabbathSchoolLesson && (
            <p className="text-sm text-maroon-700 font-medium mt-3">
              Sabbath School: {bulletin.sabbathSchoolLesson}
            </p>
          )}

          {bulletin.orderOfService && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Order of Service</h3>
              <div className="divide-y divide-gray-100 border-y border-gray-100">
                {bulletin.orderOfService.map((item) => (
                  <div key={item.item} className="flex items-center gap-3 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-maroon-600 w-20 shrink-0">
                      <Clock size={13} />
                      {item.time}
                    </span>
                    <span className="text-sm text-gray-700">{item.item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Announcements</h3>
            <ul className="space-y-2">
              {bulletin.announcements.map((note) => (
                <li key={note} className="text-sm text-gray-600 leading-relaxed flex gap-2">
                  <span className="text-maroon-400 mt-1">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between bg-maroon-50 rounded-xl px-4 py-3">
            <span className="text-sm text-maroon-800">
              This {tab === "weekly" ? "week's" : "period's"} offering focus
            </span>
            <span className="text-sm font-semibold text-maroon-700">{bulletin.offeringFocus}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={bulletin.pdf}
              download
              className="inline-flex items-center gap-2 bg-maroon-600 hover:bg-maroon-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <Download size={16} /> Download PDF
            </a>
            <a
              href={bulletin.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <ExternalLink size={16} /> Open in new tab
            </a>
          </div>
        </div>
      </div>

      {/* Archive */}
      <section className="bg-cream" id="archive">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">Archive</span>
          <h2 className="font-serif text-2xl sm:text-3xl mt-2">Past bulletins</h2>
          <p className="text-gray-500 mt-2">
            Search by date, theme, or keyword — for example &ldquo;baptism&rdquo;, &ldquo;camp
            meeting&rdquo;, or &ldquo;September 2026&rdquo;.
          </p>

          <div className="relative mt-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Search past bulletins"
              aria-label="Search past bulletins"
              className="w-full rounded-full border-2 border-gray-200 bg-white pl-11 pr-11 py-3 text-sm focus:outline-none focus:border-maroon-500"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setVisible(PAGE_SIZE);
                }}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-maroon-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(["all", "weekly", "monthly", "quarterly", "yearly"] as const).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setType(key);
                  setVisible(PAGE_SIZE);
                }}
                className={chip(type === key)}
              >
                {key === "all" ? "All" : TYPE_LABEL[key]}
                <span className="ml-1.5 opacity-70">{counts[key] || 0}</span>
              </button>
            ))}
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              aria-label="Filter by year"
              className="ml-auto rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-600 focus:outline-none focus:border-maroon-500"
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-5 text-xs text-gray-500" aria-live="polite">
            Showing {Math.min(visible, results.length)} of {results.length}{" "}
            {results.length === 1 ? "bulletin" : "bulletins"}
          </p>

          <ul className="mt-3 space-y-3">
            {results.slice(0, visible).map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-maroon-50 text-maroon-600 flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                        {TYPE_LABEL[item.periodType]}
                      </span>
                      <span className="text-xs text-gray-400">{item.dateLabel}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 leading-snug">{item.title}</h3>
                    {item.theme && (
                      <p className="text-sm text-maroon-700 font-medium">{item.theme}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{item.summary}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  >
                    <ExternalLink size={14} /> View
                  </a>
                  <a
                    href={item.pdf}
                    download
                    className="inline-flex items-center gap-1.5 bg-maroon-600 hover:bg-maroon-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  >
                    <Download size={14} /> PDF{item.size ? ` · ${item.size}` : ""}
                  </a>
                </div>
              </li>
            ))}
          </ul>

          {results.length === 0 && (
            <div className="mt-3 bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <p className="text-sm text-gray-600">No bulletins match your search.</p>
              <p className="text-xs text-gray-400 mt-1">
                Try a different word, or clear the filters.
              </p>
              {filtersActive && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm font-semibold text-maroon-700 hover:underline"
                >
                  Clear search and filters
                </button>
              )}
            </div>
          )}

          {results.length > visible && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full border border-maroon-700 px-6 py-2.5 text-sm font-semibold text-maroon-700 hover:bg-maroon-700 hover:text-white transition-colors"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
