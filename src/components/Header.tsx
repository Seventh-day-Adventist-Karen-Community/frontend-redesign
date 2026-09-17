"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Radio } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/bulletin", label: "Bulletin" },
  { href: "/events", label: "Events" },
  { href: "/ministries", label: "Ministries" },
  { href: "/about", label: "About" },
  { href: "/giving", label: "Giving" },
];

// Every page now has its own hero (see PageHero.tsx / the homepage's
// full-screen hero), so the transparent-over-hero header applies
// everywhere except the plain legal pages, which have no hero to sit on.
const isHeroPath = (pathname: string) => !pathname.startsWith("/legal");

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHeroRoute = isHeroPath(pathname);

  useEffect(() => {
    if (!isHeroRoute) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHeroRoute]);

  // Close the mobile menu on route change so it doesn't stay open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const transparent = isHeroRoute && !scrolled && !open;

  return (
    <header
      className={`${isHeroRoute ? "fixed" : "sticky"} top-0 inset-x-0 z-40 transition-colors duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src={transparent ? "/logo.svg" : "/logo_maroon.svg"}
            alt="Karen Community Church"
            width={465}
            height={160}
            priority
            className="h-8 sm:h-9 w-auto transition-opacity"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                transparent
                  ? "text-white/90 hover:text-white"
                  : "text-gray-700 hover:text-maroon-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/live"
            className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
              transparent
                ? "bg-white/15 border border-white/40 text-white hover:bg-white/25"
                : "bg-maroon-600 hover:bg-maroon-700 text-white"
            }`}
          >
            <Radio size={15} />
            Live
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden p-2 -mr-2 transition-colors ${
              transparent ? "text-white" : "text-gray-700"
            }`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-gray-100 px-4 sm:px-6 py-3 flex flex-col gap-1 bg-white">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-gray-700 hover:text-maroon-600"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/live"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 bg-maroon-600 text-white text-sm font-semibold px-4 py-2 rounded-full"
          >
            <Radio size={15} />
            Live
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
