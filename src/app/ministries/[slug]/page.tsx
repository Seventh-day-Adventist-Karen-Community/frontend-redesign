import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Clock, Mail, ArrowLeft } from "lucide-react";
import { ministries } from "@/data/ministries";
import { events } from "@/data/events";
import EventCard from "@/components/EventCard";
import PageHero from "@/components/PageHero";

export function generateStaticParams() {
  return ministries.map((m) => ({ slug: m.slug }));
}

export default function MinistryDetailPage({ params }: { params: { slug: string } }) {
  const ministry = ministries.find((m) => m.slug === params.slug);
  if (!ministry) notFound();

  const relatedEvents = events.filter((e) => e.department === ministry.name);

  return (
    <div>
      <PageHero
        eyebrow={`${ministry.emoji} Ministry`}
        title={ministry.name}
        description={ministry.summary}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <Link
          href="/ministries"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-maroon-600"
        >
          <ArrowLeft size={15} /> All ministries
        </Link>

        <p className="text-gray-600 mt-6 leading-relaxed">{ministry.description}</p>

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-maroon-600 mb-1">
              <Clock size={14} /> Meets
            </div>
            <p className="text-sm text-gray-700">{ministry.meetingSchedule}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-maroon-600 mb-1">
              <Users size={14} /> Leaders
            </div>
            <p className="text-sm text-gray-700">{ministry.leaders.join(", ")}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-maroon-600 mb-1">
              <Mail size={14} /> Contact
            </div>
            <p className="text-sm text-gray-700">{ministry.contact}</p>
          </div>
        </div>

        {relatedEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Upcoming from this ministry</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {relatedEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
