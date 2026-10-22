"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MinistryCard from "@/components/MinistryCard";
import { ministries } from "@/data/ministries";

// Homepage ministries: a few at a time, with page controls. (It reads the
// ministries data itself because the icons in that data are components,
// which can't be passed from a server component into a client one.)
export default function MinistriesPager({ pageSize = 4 }: { pageSize?: number }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(ministries.length / pageSize));
  const visible = ministries.slice(page * pageSize, page * pageSize + pageSize);

  const circle =
    "flex h-10 w-10 items-center justify-center rounded-full border border-maroon-700 text-maroon-700 transition-colors hover:bg-maroon-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-maroon-700";

  return (
    <div>
      {/* key remounts the grid on each page so it fades in */}
      <div
        key={page}
        className="animate-page-in grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4"
        aria-live="polite"
      >
        {visible.map((ministry) => (
          <MinistryCard key={ministry.slug} ministry={ministry} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-5">
        {pages > 1 && (
          <nav aria-label="Ministries pages" className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              aria-label="Previous ministries"
              className={circle}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1} of ${pages}`}
                  aria-current={i === page ? "page" : undefined}
                  className="flex h-8 items-center px-1"
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${
                      i === page ? "w-6 bg-maroon-600" : "w-2 bg-maroon-200"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === pages - 1}
              aria-label="Next ministries"
              className={circle}
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        )}

        <Link href="/ministries" className="text-sm font-semibold text-maroon-700 hover:underline">
          View all ministries →
        </Link>
      </div>
    </div>
  );
}
