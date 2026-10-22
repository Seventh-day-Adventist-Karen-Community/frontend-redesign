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
  const sizes = "(min-width: 1024px) 25vw, 50vw";

  return (
    <div className="group flex flex-col m-1">
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden rounded-2xl shadow-md sm:rounded-3xl"
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
            <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-maroon-700 shadow sm:left-4 sm:top-4 sm:h-10 sm:w-10">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
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
              <Icon className="h-10 w-10 sm:h-16 sm:w-16" strokeWidth={1.5} />
            </div>
          </>
        )}
      </Link>

      <h3 className="mt-3 text-base font-bold leading-snug text-maroon-700 sm:mt-5 sm:text-lg">{ministry.name}</h3>
      <div className="mt-1.5 h-px w-8 bg-maroon-400 sm:mt-2" />

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-gold sm:mt-4 sm:text-xs">
        {ministry.audience}
      </p>
      <p className="mt-1.5 line-clamp-4 text-xs leading-relaxed text-gray-500 sm:mt-2 sm:line-clamp-none sm:text-sm">{ministry.summary}</p>
      <div className="mt-2 flex flex-1 flex-wrap content-start gap-1 sm:mt-3 sm:gap-1.5">
        {ministry.groups?.map((group) => (
          <span
            key={group.slug}
            className="rounded-full bg-maroon-50 px-2 py-0.5 text-[10px] font-medium text-maroon-700 sm:px-2.5 sm:py-1 sm:text-[11px]"
          >
            {group.name}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className="mt-4 self-start rounded-full border border-maroon-700 px-4 py-1.5 text-xs font-semibold text-maroon-700 transition-colors hover:bg-maroon-700 hover:text-white sm:mt-5 sm:px-5 sm:py-2 sm:text-sm"
      >
        View Ministry
      </Link>
    </div>
  );
};

export default MinistryCard;
