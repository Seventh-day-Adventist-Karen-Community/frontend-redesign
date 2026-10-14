import Image from "next/image";

const POSITIONS = ["left top", "center", "right bottom", "left bottom", "right top", "center top", "center bottom", "right center"];
const positionFor = (seed?: string) =>
  seed ? POSITIONS[Array.from(seed).reduce((n, c) => n + c.charCodeAt(0), 0) % POSITIONS.length] : "center";

// A picture area. Uses the provided image, or the church photo under a
// maroon wash until a real picture is added.
const MediaTile = ({
  src,
  alt,
  className = "",
  seed,
}: {
  src?: string;
  alt: string;
  className?: string;
  // Varies the placeholder crop so neighbouring tiles don't look identical
  seed?: string;
}) => (
  <div className={`relative overflow-hidden bg-maroon-800 ${className}`}>
    {src ? (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    ) : (
      <>
        <Image
          src="/hero-church.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          style={{ objectPosition: positionFor(seed) }}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/85 via-maroon-800/70 to-maroon-600/60" />
      </>
    )}
  </div>
);

export default MediaTile;
