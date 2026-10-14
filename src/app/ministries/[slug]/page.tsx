import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Clock, Mail, ArrowLeft } from "lucide-react";
import { ministries } from "@/data/ministries";
import { events } from "@/data/events";
import EventCard from "@/components/EventCard";
import GroupCard from "@/components/GroupCard";
import PageHero from "@/components/PageHero";

export function generateStaticParams() {
  return ministries.map((m) => ({ slug: m.slug }));
}

// In Next.js 15+, `params` is a Promise and must be awaited before use.
// Awaiting it is also harmless on Next 14, where it's a plain object.
export default async function MinistryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);
  if (!ministry) notFound();

  const relatedEvents = events.filter((e) => e.department === ministry.name);

  return (
    <div>
      <PageHero
        eyebrow={`Ministry · ${ministry.audience}`}
        title={ministry.name}
        description={ministry.summary}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <Link
          href="/ministries"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-maroon-600"
        >
          <ArrowLeft size={15} /> All ministries
        </Link>

        <p className="text-gray-600 mt-6 leading-relaxed max-w-3xl">{ministry.description}</p>

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

        {ministry.groups && ministry.groups.length > 0 && (
          <div className="mt-14">
            <h2 className="font-serif text-2xl sm:text-3xl">
              {ministry.groupsLabel ?? "Sections"}
            </h2>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministry.groups.map((group) => (
                <GroupCard key={group.slug} ministrySlug={ministry.slug} group={group} />
              ))}
            </div>
          </div>
        )}

        {relatedEvents.length > 0 && (
          <div className="mt-14 max-w-3xl">
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
