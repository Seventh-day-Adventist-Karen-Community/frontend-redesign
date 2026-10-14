import Image from "next/image";

const SIZE_CLASS = {
  sm: "h-12 w-12 text-sm",
  md: "h-16 w-16 text-lg",
  lg: "h-24 w-24 text-2xl",
};
const SIZE_PX = { sm: 48, md: 64, lg: 96 };

// "Kids in Discipleship (KID)" -> "KID"; "Busy Bee" -> "BB"; "Friend" -> "F"
const initials = (name: string) => {
  const acronym = name.match(/\(([A-Za-z]{2,4})\)/);
  if (acronym) return acronym[1].toUpperCase();
  const skip = ["in", "of", "the", "and", "&"];
  const words = name.split(/\s+/).filter((w) => w && !skip.includes(w.toLowerCase()));
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};

// A round emblem/badge. Shows the emblem image when one is provided,
// otherwise a maroon badge with initials until the real emblem is added.
const Emblem = ({
  src,
  name,
  size = "md",
  className = "",
}: {
  src?: string;
  name: string;
  size?: keyof typeof SIZE_CLASS;
  className?: string;
}) => (
  <span
    className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full shadow-md ring-4 ring-white ${SIZE_CLASS[size]} ${
      src ? "bg-white" : "bg-gradient-to-br from-maroon-700 to-maroon-900 font-serif text-white"
    } ${className}`}
  >
    {src ? (
      <Image
        src={src}
        alt={`${name} emblem`}
        fill
        sizes={`${SIZE_PX[size]}px`}
        className="object-contain p-1.5"
      />
    ) : (
      <span aria-hidden="true">{initials(name)}</span>
    )}
  </span>
);

export default Emblem;
