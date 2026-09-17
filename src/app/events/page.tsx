"use client";

import { useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import PageHero from "@/components/PageHero";
import { events } from "@/data/events";

export default function EventsPage() {
  const [department, setDepartment] = useState<string>("All");

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(events.map((e) => e.department)))],
    []
  );

  const filtered = useMemo(() => {
    const list =
      department === "All" ? events : events.filter((e) => e.department === department);
    return [...list].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [department]);

  const featured = events.filter((e) => e.featured);

  return (
    <div>
      <PageHero
        eyebrow="Events"
        title="What's Happening"
        description="From weekly ministry gatherings to church-wide campaigns — see what's coming up."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
      {featured.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Featured</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {featured.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-10">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setDepartment(dept)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              department === dept
                ? "bg-maroon-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-maroon-300"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-6">
        {filtered.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 col-span-full">No events in this category yet.</p>
        )}
      </div>
      </div>
    </div>
  );
}
