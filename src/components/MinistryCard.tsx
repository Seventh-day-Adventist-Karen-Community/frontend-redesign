import Link from "next/link";
import Image from "next/image";
import type { Ministry } from "@/data/ministries";

// Different crops of the same church photo, so the fallback tiles don't all
// look identical before real ministry photos are added.
const FALLBACK_POSITIONS = [
  "left top",
  "center",
  "right bottom",
  "left bottom",
  "right top",
  "center top",
  "center bottom",
  "right center",
];

const positionFor = (slug: string) => {
  const hash = Array.from(slug).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return FALLBACK_POSITIONS[hash % FALLBACK_POSITIONS.length];
};

const MinistryCard = ({ ministry }: { ministry: Ministry }) => {
  const href = `/ministries/${ministry.slug}`;
  const Icon = ministry.icon;
  const sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

  return (
    <div className="group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden rounded-3xl shadow-md"
      >
        {ministry.image ? (
          <>
            <Image
              src={ministry.image}
              alt={ministry.name}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-maroon-700 shadow">
              <Icon size={20} />
            </span>
          </>
        ) : (
          <>
            <Image
              src="/hero-church.png"
              alt=""
              fill
              sizes={sizes}
              style={{ objectPosition: positionFor(ministry.slug) }}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/85 via-maroon-800/70 to-maroon-600/60" />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <Icon size={64} strokeWidth={1.5} />
            </div>
          </>
        )}
      </Link>

      <h3 className="mt-5 text-lg font-bold text-maroon-700">{ministry.name}</h3>
      <div className="mt-2 h-px w-8 bg-maroon-400" />

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold">
        {ministry.audience}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{ministry.summary}</p>
      <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
        {ministry.groups?.map((group) => (
          <span
            key={group.slug}
            className="rounded-full bg-maroon-50 px-2.5 py-1 text-[11px] font-medium text-maroon-700"
          >
            {group.name}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className="mt-5 self-start rounded-full border border-maroon-700 px-5 py-2 text-sm font-semibold text-maroon-700 transition-colors hover:bg-maroon-700 hover:text-white"
      >
        View Ministry
      </Link>
    </div>
  );
};

export default MinistryCard;
