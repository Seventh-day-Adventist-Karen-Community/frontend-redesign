import MinistryCard from "@/components/MinistryCard";
import PageHero from "@/components/PageHero";
import { ministries } from "@/data/ministries";

export default function MinistriesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Ministries"
        title="Find Your Place"
        description="Every member of KCC has a place to grow, serve, and belong. Explore our ministries and departments below."
      />

      <div className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
            {ministries.map((ministry) => (
              <MinistryCard key={ministry.slug} ministry={ministry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
