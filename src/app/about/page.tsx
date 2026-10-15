import { MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import LocationMap from "@/components/LocationMap";
import { directionsUrl, location } from "@/data/location";

const COMMITTEE = [
  { name: "Elder James Mwangi", role: "Head Elder" },
  { name: "Sis. Caroline Njeri", role: "Church Clerk" },
  { name: "Bro. Peter Otieno", role: "Treasurer" },
  { name: "Sis. Mary Wambui", role: "Sabbath School Superintendent" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        title="Karen Community SDA Church"
        description="A family of believers in Karen, Nairobi, worshipping together, growing in faith, and serving our community."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <p className="text-gray-600 leading-relaxed">
          Karen Community Seventh-day Adventist Church is a family of believers in Karen, Nairobi,
          worshipping together, growing in faith, and serving our community — from weekly ministry
          gatherings to outreach campaigns like our annual mission trip to Ibisil, Kajiado.
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          We believe in the soon return of Jesus Christ and hold to the Seventh-day Adventist
          Church's Fundamental Beliefs, rooted in Scripture.
        </p>

        <h2 className="font-serif text-2xl mt-12 mb-5">Church Leadership</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {COMMITTEE.map((person) => (
            <div key={person.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-semibold text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.role}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl mt-12 mb-5">Visit Us</h2>
        <LocationMap className="aspect-video" />
        <p className="text-gray-600 mt-4 flex items-center gap-2">
          <MapPin size={16} className="text-maroon-600" />
          {location.name} · {location.area}
        </p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 bg-maroon-600 hover:bg-maroon-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          <MapPin size={16} /> Get directions
        </a>

        <div className="mt-4 divide-y divide-gray-200 border-y border-gray-200 max-w-sm">
          {[
            ["Sabbath School", "9:00 AM"],
            ["Divine Service", "11:00 AM"],
            ["Midweek Prayer (Wed)", "6:00 PM"],
          ].map(([label, time]) => (
            <div key={label} className="flex justify-between py-2.5 text-sm">
              <span className="text-gray-600">{label}</span>
              <span className="font-semibold text-gray-900">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
