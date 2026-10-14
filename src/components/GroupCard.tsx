import Link from "next/link";
import type { MinistryGroup } from "@/data/ministries";
import Emblem from "@/components/Emblem";
import MediaTile from "@/components/MediaTile";

const GroupCard = ({
  ministrySlug,
  group,
}: {
  ministrySlug: string;
  group: MinistryGroup;
}) => {
  const classCount = group.classes?.length ?? 0;

  return (
    <Link
      href={`/ministries/${ministrySlug}/${group.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative">
        <MediaTile src={group.image} alt={group.name} seed={group.slug} className="aspect-[4/3]" />
        <Emblem src={group.emblem} name={group.name} className="absolute -bottom-8 left-5" />
      </div>

      <div className="flex flex-1 flex-col p-5 pt-11">
        {group.ageRange && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">{group.ageRange}</p>
        )}
        <h3 className="mt-1 text-lg font-bold text-maroon-700">{group.name}</h3>
        <div className="mt-2 h-px w-8 bg-maroon-400" />
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">{group.summary}</p>
        <p className="mt-4 text-sm font-semibold text-maroon-700 group-hover:underline">
          {classCount > 0
            ? `${classCount} ${group.classesLabel?.toLowerCase() ?? "classes"} →`
            : "Learn more →"}
        </p>
      </div>
    </Link>
  );
};

export default GroupCard;
