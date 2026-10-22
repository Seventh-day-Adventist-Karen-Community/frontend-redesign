"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { PeriodType } from "@/data/bulletin";
import { archive } from "@/data/archive";
import ArchiveRow, { TYPE_LABEL } from "@/components/ArchiveRow";

const chip = (active: boolean) =>
  `px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
    active
      ? "bg-maroon-600 text-white"
      : "bg-white border border-gray-200 text-gray-600 hover:border-maroon-300"
  }`;

// The full archive: every past bulletin, searchable, filterable by type and
// year, and grouped by year.
export default function ArchiveBrowser({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<PeriodType | "all">("all");
  const [year, setYear] = useState("all");

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

  // Newest first (the data is already sorted), grouped under a heading per year
  const groups = useMemo(() => {
    const byYear = new Map<string, typeof results>();
    results.forEach((item) => {
      const y = item.date.slice(0, 4);
      byYear.set(y, [...(byYear.get(y) ?? []), item]);
    });
    return Array.from(byYear.entries());
  }, [results]);

  const filtersActive = query !== "" || type !== "all" || year !== "all";
  const clearFilters = () => {
    setQuery("");
    setType("all");
    setYear("all");
  };

  return (
    <div>
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by date, theme, or keyword"
          aria-label="Search past bulletins"
          className="w-full rounded-full border-2 border-gray-200 bg-white py-3 pl-11 pr-11 text-sm focus:border-maroon-500 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-maroon-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {(["all", "weekly", "monthly", "quarterly", "yearly"] as const).map((key) => (
          <button key={key} onClick={() => setType(key)} className={chip(type === key)}>
            {key === "all" ? "All" : TYPE_LABEL[key]}
            <span className="ml-1.5 opacity-70">{counts[key] || 0}</span>
          </button>
        ))}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          aria-label="Filter by year"
          className="ml-auto rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-600 focus:border-maroon-500 focus:outline-none"
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
        {results.length === archive.length
          ? `All ${archive.length} past bulletins`
          : `${results.length} of ${archive.length} bulletins`}
        {filtersActive && (
          <button onClick={clearFilters} className="ml-3 font-semibold text-maroon-700 hover:underline">
            Clear filters
          </button>
        )}
      </p>

      {groups.map(([groupYear, items]) => (
        <section key={groupYear} className="mt-8" aria-label={`${groupYear} bulletins`}>
          <div className="mb-3 flex items-baseline gap-3 border-b border-maroon-100 pb-2">
            <h2 className="font-serif text-2xl text-maroon-700">{groupYear}</h2>
            <span className="text-xs text-gray-500">
              {items.length} {items.length === 1 ? "bulletin" : "bulletins"}
            </span>
          </div>
          <ul className="space-y-3">
            {items.map((item) => (
              <ArchiveRow key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ))}

      {results.length === 0 && (
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <p className="text-sm text-gray-600">No bulletins match your search.</p>
          <p className="mt-1 text-xs text-gray-400">Try a different word, or clear the filters.</p>
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
    </div>
  );
}
