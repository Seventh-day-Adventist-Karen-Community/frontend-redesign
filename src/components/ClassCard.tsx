import type { MinistryClass } from "@/data/ministries";
import Emblem from "@/components/Emblem";
import MediaTile from "@/components/MediaTile";

const ClassCard = ({ item }: { item: MinistryClass }) => (
  <div className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-5 text-center shadow-sm">
    {item.image ? (
      <div className="relative w-full pb-9">
        <MediaTile src={item.image} alt={item.name} seed={item.name} className="aspect-video rounded-2xl" />
        <Emblem
          src={item.emblem}
          name={item.name}
          size="md"
          className="absolute -bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>
    ) : (
      <Emblem src={item.emblem} name={item.name} size="lg" />
    )}

    <h3 className="mt-4 text-lg font-bold text-maroon-700">{item.name}</h3>
    {item.ageRange && (
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">{item.ageRange}</p>
    )}
    {item.description && (
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.description}</p>
    )}
  </div>
);

export default ClassCard;
