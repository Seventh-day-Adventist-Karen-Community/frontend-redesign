"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { bulletins, PeriodType } from "@/data/bulletin";
import PageHero from "@/components/PageHero";

const TABS: { key: PeriodType; label: string }[] = [
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "yearly", label: "Yearly" },
];

export default function BulletinPage() {
  const [tab, setTab] = useState<PeriodType>("weekly");
  const bulletin = bulletins[tab];

  return (
    <div>
      <PageHero
        eyebrow="Bulletin"
        title="Church Bulletin"
        description="Everything happening this Sabbath, this month, this quarter, and this year."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              tab === t.key
                ? "bg-maroon-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-maroon-300"
            }`}
          >
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
      </div>

      <p className="text-xs text-gray-400 mt-6">
        Looking for an older bulletin? An archive, browsable by date, would live here.
      </p>
      </div>
    </div>
  );
}
