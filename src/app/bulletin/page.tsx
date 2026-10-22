"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Download, ExternalLink, Search } from "lucide-react";
import { bulletins, PeriodType } from "@/data/bulletin";
import { archive } from "@/data/archive";
import PageHero from "@/components/PageHero";
import ArchiveRow from "@/components/ArchiveRow";

const TABS: { key: PeriodType; label: string }[] = [
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "yearly", label: "Yearly" },
];

// How many of the most recent past bulletins to show here; the rest live on the archive page.
const RECENT_COUNT = 5;

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

  const recent = archive.slice(0, RECENT_COUNT);

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

      {/* Recent past bulletins; everything else is on the archive page */}
      <section className="bg-cream" id="archive">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">Archive</span>
          <h2 className="font-serif text-2xl sm:text-3xl mt-2">Past bulletins</h2>
          <p className="text-gray-500 mt-2">
            The most recent ones are below. Looking for something older? Search the full archive.
          </p>

          {/* Plain GET form: lands on the archive page with the search filled in */}
          <form action="/bulletin/archive" method="get" role="search" className="relative mt-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              name="q"
              placeholder="Search all past bulletins"
              aria-label="Search all past bulletins"
              className="w-full rounded-full border-2 border-gray-200 bg-white py-3 pl-11 pr-28 text-sm focus:border-maroon-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-maroon-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-maroon-700"
            >
              Search
            </button>
          </form>

          <ul className="mt-6 space-y-3">
            {recent.map((item) => (
              <ArchiveRow key={item.id} item={item} />
            ))}
          </ul>

          <div className="mt-8 text-center">
            <Link
              href="/bulletin/archive"
              className="inline-flex items-center gap-2 rounded-full border border-maroon-700 px-6 py-2.5 text-sm font-semibold text-maroon-700 transition-colors hover:bg-maroon-700 hover:text-white"
            >
              View full archive ({archive.length} bulletins) →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
