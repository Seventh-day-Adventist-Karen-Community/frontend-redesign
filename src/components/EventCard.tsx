import { MapPin, Clock } from "lucide-react";
import type { Event } from "@/data/events";

const monthDay = (iso: string) => {
  const d = new Date(iso);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }),
    day: d.toLocaleDateString("en-US", { day: "numeric" }),
  };
};

const EventCard = ({ event }: { event: Event }) => {
  const { month, day } = monthDay(event.date);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 hover:shadow-md transition-shadow">
      <div className="shrink-0 w-14 h-14 rounded-xl bg-maroon-50 text-maroon-700 flex flex-col items-center justify-center leading-none">
        <span className="text-[10px] font-semibold uppercase">{month}</span>
        <span className="text-lg font-bold">{day}</span>
      </div>
      <div className="min-w-0">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-maroon-600 mb-1">
          {event.department}
        </span>
        <h3 className="font-semibold text-gray-900 leading-snug">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Clock size={13} /> {event.time}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={13} /> {event.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
