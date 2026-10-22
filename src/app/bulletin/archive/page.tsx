import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import ArchiveBrowser from "@/components/ArchiveBrowser";

export const metadata = {
  title: "Bulletin Archive | Karen Community SDA",
  description: "Every past church bulletin: weekly, monthly, quarterly and yearly.",
};

// In Next.js 15+, `searchParams` is a Promise (harmless to await on 14).
export default async function BulletinArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const initialQuery = (Array.isArray(q) ? q[0] : q) ?? "";

  return (
    <div>
      <PageHero
        eyebrow="Bulletin archive"
        title="All Past Bulletins"
        description="Every weekly, monthly, quarterly and yearly bulletin, newest first. Search by date, theme or keyword."
      />

      <div className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <Link
            href="/bulletin"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-maroon-600"
          >
            <ArrowLeft size={15} /> Current bulletin
          </Link>
          <ArchiveBrowser initialQuery={initialQuery} />
        </div>
      </div>
    </div>
  );
}
