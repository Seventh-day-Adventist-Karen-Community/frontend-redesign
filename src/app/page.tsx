import Link from "next/link";
import Image from "next/image";
import { PlayCircle, MapPin, Clock, Calendar } from "lucide-react";
import EventCard from "@/components/EventCard";
import MinistryCard from "@/components/MinistryCard";
import { events } from "@/data/events";
import { ministries } from "@/data/ministries";
import { bulletins } from "@/data/bulletin";

const glance = [
  {
    title: "Sabbath School",
    time: "9:00 AM",
    description: "Small-group Bible study for every age, every Sabbath.",
  },
  {
    title: "Divine Service",
    time: "11:00 AM",
    description: "Worship, message, and communion as one church family.",
  },
  {
    title: "Midweek Prayer",
    time: "Wed · 6:00 PM",
    description: "A short pause in the week to pray and study together.",
  },
  {
    title: "Featured this week",
    time: bulletins.weekly.sabbathSchoolLesson,
    description: bulletins.weekly.announcements[0],
  },
];

export default function Home() {
  const upcoming = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div>
      {/* Hero — full screen, with the transparent header (see Header.tsx)
          floating over it. The source image already carries a dark wash on
          the left where the text sits and the brand pattern showing through
          on the right, so the overlay here just deepens that a touch rather
          than flattening it. */}
      <section className="relative min-h-screen flex items-center overflow-hidden text-white">
        <Image
          src="/hero-landing.png"
          alt=""
          fill
          priority
          className="object-cover object-center -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 -z-10" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-28">
          <p className="text-sm font-medium text-maroon-100/80">Karen, Nairobi · sdackc.org</p>
          <h1 className="font-serif text-4xl sm:text-6xl leading-tight mt-3 max-w-2xl">
            Believe and Live
          </h1>
          <p className="mt-4 text-maroon-50/90 text-base sm:text-lg max-w-xl leading-relaxed">
            Karen Community Seventh-day Adventist Church — a family growing in
            faith together, worshipping, serving, and reaching our community
            week after week.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/live"
              className="bg-white text-maroon-700 font-semibold px-6 py-3 rounded-full hover:bg-maroon-50 transition-colors"
            >
              Watch Live
            </Link>
            <Link
              href="/bulletin"
              className="bg-maroon-600/40 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-maroon-600/60 transition-colors"
            >
              This Week's Bulletin
            </Link>
          </div>

          {/* This Sabbath module */}
          <div className="mt-12 bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-5 sm:p-6 max-w-xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-maroon-50 mb-3">
              <Calendar size={16} />
              This Sabbath — {bulletins.weekly.dateRange}
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {bulletins.weekly.orderOfService?.slice(0, 2).map((item) => (
                <div key={item.item} className="flex items-center gap-2 text-maroon-50/90">
                  <Clock size={14} className="shrink-0" />
                  <span>
                    <span className="font-semibold">{item.time}</span> — {item.item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* This Week at a Glance */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wide text-maroon-600">
            This week at a glance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl mt-2">
            One church, gathered together
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {glance.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-semibold text-maroon-600">{item.time}</p>
              <h3 className="font-semibold text-gray-900 mt-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/bulletin" className="text-sm font-semibold text-maroon-700 hover:underline">
            View the full bulletin →
          </Link>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-maroon-600">
                What's coming up
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl mt-2">Upcoming events</h2>
            </div>
            <Link href="/events" className="text-sm font-semibold text-maroon-700 hover:underline">
              See all events →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Ministries grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wide text-maroon-600">
            Find your place
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl mt-2">Ministries &amp; departments</h2>
          <p className="text-gray-500 mt-2">
            Every member has a place to grow, serve, and belong.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ministries.slice(0, 8).map((ministry) => (
            <MinistryCard key={ministry.slug} ministry={ministry} />
          ))}
        </div>
      </section>

      {/* Giving banner */}
      <section className="bg-maroon-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white">
              Partner with us in ministry
            </h2>
            <p className="text-maroon-50/90 mt-2 max-w-md">
              Give tithes and offerings in a few taps, right from your phone.
            </p>
          </div>
          <Link
            href="/giving"
            className="shrink-0 bg-white text-maroon-700 font-semibold px-7 py-3 rounded-full hover:bg-maroon-50 transition-colors"
          >
            Give Now
          </Link>
        </div>
      </section>

      {/* Media teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-maroon-600">
              This week's message
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl mt-2">
              Catch up on this Sabbath's sermon
            </h2>
            <p className="text-gray-500 mt-3 leading-relaxed max-w-md">
              Missed a Sabbath, or want to revisit a message? Every sermon is
              recorded and available to watch anytime.
            </p>
            <Link
              href="/live"
              className="inline-flex items-center gap-2 mt-5 bg-maroon-600 hover:bg-maroon-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <PlayCircle size={18} />
              Watch sermons
            </Link>
          </div>
          <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-maroon-800 to-maroon-600 flex items-center justify-center">
            <PlayCircle size={56} className="text-white/90" />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-video md:aspect-auto flex items-center justify-center text-gray-400 text-sm">
            Map placeholder
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-maroon-600">
              Join us
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl mt-2">Find us this Sabbath</h2>
            <p className="text-gray-500 mt-2 flex items-center gap-2">
              <MapPin size={16} /> Karen, Nairobi
            </p>
            <div className="mt-5 divide-y divide-gray-200 border-y border-gray-200 max-w-sm">
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
            <Link href="/about" className="text-sm font-semibold text-maroon-700 hover:underline mt-5">
              Directions &amp; more about us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
