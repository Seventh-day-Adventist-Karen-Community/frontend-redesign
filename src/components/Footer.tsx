"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-red-950 text-red-50 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <Image src="/logo.svg" width={44} height={44} alt="Karen Community Church" className="h-16 w-36 mb-3" />
          <p className="text-sm text-red-100/80 leading-relaxed">
            {/* Karen, Nairobi ·{" "} */}
            <a href="https://sdackc.org" className="hover:underline">
              sdackc.org
            </a>
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-white mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-red-100/80">
            {[
              ["/bulletin", "Bulletin"],
              ["/events", "Events"],
              ["/ministries", "Ministries"],
              ["/giving", "Giving"],
              ["/live", "Live"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-white mb-3">Stay updated</div>
          <p className="text-sm text-red-100/80 mb-3">
            Get weekly bulletin and event updates on WhatsApp or email.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 min-w-0 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white/95 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="shrink-0 bg-white text-red-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-between text-xs text-red-100/70">
          <div className="flex gap-4">
            <Link href="/legal/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-of-use" className="hover:text-white">
              Terms of Use
            </Link>
          </div>
          <div>© {new Date().getFullYear()} Karen Community Seventh-day Adventist Church</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
