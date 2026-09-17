import Link from "next/link";
import type { Ministry } from "@/data/ministries";

const MinistryCard = ({ ministry }: { ministry: Ministry }) => {
  return (
    <Link
      href={`/ministries/${ministry.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-maroon-100 transition-all"
    >
      <div className="w-11 h-11 rounded-xl bg-maroon-50 flex items-center justify-center text-xl mb-4">
        {ministry.emoji}
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-maroon-700 transition-colors">
        {ministry.name}
      </h3>
      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{ministry.summary}</p>
      <p className="text-xs text-maroon-600 font-medium mt-3">{ministry.meetingSchedule}</p>
    </Link>
  );
};

export default MinistryCard;
