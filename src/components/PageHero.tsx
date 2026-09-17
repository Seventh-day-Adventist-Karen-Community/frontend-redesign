import Image from "next/image";

const PageHero = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => {
  return (
    <section className="relative overflow-hidden text-white">
      <Image
        src="/hero-church.png"
        alt=""
        fill
        priority
        className="object-cover object-center -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/85 via-maroon-800/65 to-maroon-700/40 -z-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-14 sm:pb-16">
        <span className="text-xs font-black uppercase tracking-wide text-maroon-100">
          {eyebrow}
        </span>
        <h1 className="font-black text-3xl sm:text-4xl mt-2">{title}</h1>
        {description && (
          <p className="text-maroon-50/90 mt-3 max-w-xl leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
