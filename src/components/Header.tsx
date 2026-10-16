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

const isActive = (pathname: string, href: string) =>
	href === "/" ? pathname === "/" : pathname.startsWith(href);

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

	// While the full-screen menu is open: lock page scroll and let Escape close it.
	useEffect(() => {
		if (!open) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	const transparent = isHeroRoute && !scrolled;

	return (
		<>
			<header
				className={`${isHeroRoute ? "fixed" : "sticky"} top-0 inset-x-0 z-40 transition-colors duration-300 ${transparent
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
								className={`text-sm font-medium transition-colors ${transparent
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
							className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${transparent
									? "bg-white/15 border border-white/40 text-white hover:bg-white/25"
									: "bg-red-600 hover:bg-red-700 text-white"
								}`}
						>
							<Radio size={15} />
							Live
						</Link>
						<button
							type="button"
							aria-label="Open menu"
							aria-expanded={open}
							onClick={() => setOpen(true)}
							className={`md:hidden p-2 -mr-2 transition-colors ${transparent ? "text-white" : "text-gray-700"
								}`}
						>
							<Menu size={26} />
						</button>
					</div>
				</div>
			</header>

			{/* Full-screen mobile menu. Rendered outside <header> on purpose: the
          header's backdrop-blur would otherwise become the containing block
          for this fixed overlay and stop it covering the whole viewport. */}
			{open && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label="Menu"
					className="md:hidden fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-red-800 via-red-900 to-red-950 text-white"
				>
					<div className="h-16 px-4 flex items-center justify-between shrink-0">
						<Link href="/" onClick={() => setOpen(false)} className="shrink-0">
							<Image
								src="/logo.svg"
								alt="Karen Community Church"
								width={465}
								height={160}
								className="h-8 w-auto"
							/>
						</Link>
						<button
							type="button"
							aria-label="Close menu"
							onClick={() => setOpen(false)}
							className="p-2 -mr-2 text-white"
						>
							<X size={28} />
						</button>
					</div>

					<nav className="flex-1 flex flex-col items-center justify-center gap-7 px-6 pb-16 overflow-y-auto">
						{NAV_LINKS.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setOpen(false)}
								className={`font-serif text-2xl text-center transition-colors ${isActive(pathname, link.href)
										? "text-white font-semibold  decoration-red-300 decoration-2 underline-offset-8"
										: "text-white/75 hover:text-white"
									}`}
							>
								{link.label}
							</Link>
						))}
						<Link
							href="/live"
							onClick={() => setOpen(false)}
							className="mt-4 inline-flex items-center gap-2 bg-white text-red-700 text-l font-semibold px-8 py-2 rounded-full hover:bg-red-50 transition-colors"
						>
							<Radio size={20} />
							Live
						</Link>
					</nav>
				</div>
			)}
		</>
	);
};

export default Header;
