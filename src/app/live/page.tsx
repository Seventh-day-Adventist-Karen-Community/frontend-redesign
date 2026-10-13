import { PlayCircle, Radio } from "lucide-react";
import PageHero from "@/components/PageHero";

// Draft toggle — in the real build this would come from whether a stream is
// currently active.
const IS_LIVE = false;

export default function LivePage() {
  return (
    <div>
      <PageHero
        eyebrow="Live"
        title={IS_LIVE ? "We're live right now" : "Not live right now"}
        description={
          IS_LIVE
            ? "Join the service in progress below."
            : "Next service: Sabbath, 20 September 2026 · 11:00 AM"
        }
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-maroon-800 to-maroon-600 flex flex-col items-center justify-center gap-3">
          {IS_LIVE ? (
            <>
              <div className="flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Radio size={12} /> LIVE
              </div>
              <PlayCircle size={56} className="text-white/90" />
            </>
          ) : (
            <>
              <PlayCircle size={48} className="text-white/70" />
              <p className="text-white/70 text-sm">Stream will appear here when live</p>
            </>
          )}
        </div>

        <h2 className="font-serif text-2xl mt-14 mb-4">Past sermons</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {["Believe and Live", "Faith That Works", "A Cheerful Giver", "Called to Serve"].map(
            (title) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-maroon-50 flex items-center justify-center text-maroon-600 shrink-0">
                  <PlayCircle size={20} />
                </div>
                <span className="text-sm font-medium text-gray-800">{title}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
