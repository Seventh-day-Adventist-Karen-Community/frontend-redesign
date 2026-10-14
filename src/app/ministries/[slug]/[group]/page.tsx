import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Clock, CalendarDays, ArrowLeft } from "lucide-react";
import { ministries } from "@/data/ministries";
import ClassCard from "@/components/ClassCard";
import Emblem from "@/components/Emblem";
import PageHero from "@/components/PageHero";

export function generateStaticParams() {
  return ministries.flatMap((m) =>
    (m.groups ?? []).map((g) => ({ slug: m.slug, group: g.slug }))
  );
}

export default async function MinistryGroupPage({
  params,
}: {
  params: Promise<{ slug: string; group: string }>;
}) {
  const { slug, group: groupSlug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);
  const group = ministry?.groups?.find((g) => g.slug === groupSlug);
  if (!ministry || !group) notFound();

  const meets = group.meetingSchedule ?? ministry.meetingSchedule;
  const leaders = group.leaders ?? ministry.leaders;

  return (
    <div>
      <PageHero
        eyebrow={ministry.name}
        title={group.name}
        description={group.summary}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <Link
          href={`/ministries/${ministry.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-maroon-600"
        >
          <ArrowLeft size={15} /> Back to {ministry.name}
        </Link>

        {(group.emblem || group.description) && (
          <div className="mt-6 flex flex-col sm:flex-row sm:items-start gap-6">
            <Emblem src={group.emblem} name={group.name} size="lg" />
            {group.description && (
              <p className="text-gray-600 leading-relaxed max-w-3xl">{group.description}</p>
            )}
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {group.ageRange && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-maroon-600 mb-1">
                <CalendarDays size={14} /> Ages
              </div>
              <p className="text-sm text-gray-700">{group.ageRange}</p>
            </div>
          )}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-maroon-600 mb-1">
              <Clock size={14} /> Meets
            </div>
            <p className="text-sm text-gray-700">{meets}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-maroon-600 mb-1">
              <Users size={14} /> Leaders
            </div>
            <p className="text-sm text-gray-700">{leaders.join(", ")}</p>
          </div>
        </div>

        {group.classes && group.classes.length > 0 && (
          <div className="mt-14">
            <h2 className="font-serif text-2xl sm:text-3xl">{group.classesLabel ?? "Classes"}</h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {group.classes.map((item) => (
                <ClassCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
