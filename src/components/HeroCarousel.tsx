"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { HeroSlide } from "@/data/hero";

const INTERVAL_MS = 8000;
const SWIPE_PX = 50;

const ctaClass = {
    primary:
        "bg-white text-maroon-700 font-semibold px-6 py-3 rounded-full hover:bg-maroon-50 transition-colors",
    secondary:
        "bg-maroon-600/40 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-maroon-600/60 transition-colors",
};

const roundBtn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// Full-screen hero that rotates through messages, and cross-fades the
// background picture whenever the next message uses a different one.
// `children` (e.g. the "This Sabbath" card) stays put under the messages.
export default function HeroCarousel({
    slides,
    children,
}: {
    slides: HeroSlide[];
    children?: React.ReactNode;
}) {
    const count = slides.length;
    const [index, setIndex] = useState(0);
    const [userPaused, setUserPaused] = useState(false); // the pause button
    const [hovering, setHovering] = useState(false); // mouse over the text or controls
    const [focused, setFocused] = useState(false); // keyboard focus inside
    const [reducedMotion, setReducedMotion] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const playing = count > 1 && !userPaused && !hovering && !focused && !reducedMotion;

    const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

    // Respect "reduce motion": no automatic rotation (manual controls still work).
    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(query.matches);
        const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    // Advance after INTERVAL_MS. Re-runs on every slide change, so picking a
    // slide by hand restarts the countdown.
    useEffect(() => {
        if (!playing) return;
        const timer = setTimeout(() => go(index + 1), INTERVAL_MS);
        return () => clearTimeout(timer);
    }, [playing, index, go]);

    const pauseOnMouse = {
        onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovering(true),
        onPointerLeave: () => setHovering(false),
    };

    const images = Array.from(new Set(slides.map((s) => s.image)));
    const activeImage = slides[index].image;

    return (
        <section
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured messages"
            className="relative isolate flex min-h-dvh items-end overflow-hidden text-white"
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(dx) > SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
            }}
            onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
            }}
        >
            {/* Background pictures: one layer per image, cross-fading */}
            {images.map((src, i) => (
                <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    className={`-z-10 object-cover object-center transition-opacity duration-1000 motion-reduce:transition-none ${src === activeImage ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-800/60 via-red-800/40 to-maroon-600/80" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/40 to-transparent" />

            <h1 className="sr-only">Seventh-day Adventist Church, Karen</h1>

            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 pt-28 sm:px-6 sm:pb-16">
                {/* All slides share one grid cell, so the hero never changes height */}
                <div className="grid" aria-live={playing ? "off" : "polite"} {...pauseOnMouse}>
                    {slides.map((slide, i) => {
                        const active = i === index;
                        return (
                            <div
                                key={slide.id}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${i + 1} of ${count}`}
                                aria-hidden={!active}
                                className={`col-start-1 row-start-1 transition-all duration-700 motion-reduce:transition-none ${active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                                    }`}
                            >
                                <h2 className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:text-6xl">
                                    {slide.title.map((line, n) => (
                                        <span key={n}>
                                            {n > 0 && <br />}
                                            {line}
                                        </span>
                                    ))}
                                </h2>
                                <p className="mt-4 max-w-xl text-base leading-relaxed text-maroon-50/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-lg">
                                    {slide.text}
                                </p>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {slide.ctas.map((cta) => (
                                        <Link
                                            key={cta.href + cta.label}
                                            href={cta.href}
                                            tabIndex={active ? 0 : -1}
                                            className={ctaClass[cta.variant]}
                                        >
                                            {cta.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {children}
            </div>

            {/* Controls: bottom right of the page */}
            {count > 1 && (
                <div
                    className="absolute bottom-6 right-4 z-20 flex items-center gap-3 sm:bottom-8 sm:right-8"
                    {...pauseOnMouse}
                >
                    <span className="hidden text-xs tabular-nums text-white/80 sm:block" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </span>

                    <div className="flex items-center">
                        {slides.map((slide, i) => {
                            const active = i === index;
                            return (
                                <button
                                    key={slide.id}
                                    type="button"
                                    onClick={() => go(i)}
                                    aria-label={`Go to message ${i + 1} of ${count}`}
                                    aria-current={active}
                                    className="flex h-8 items-center px-0.5 focus-visible:outline-2 focus-visible:outline-white"
                                >
                                    <span
                                        className={`relative block h-1.5 overflow-hidden rounded-full bg-white/35 transition-all duration-300 ${active ? "w-10" : "w-4"
                                            }`}
                                    >
                                        {active && (
                                            <span
                                                // restarts whenever the slide changes or playback resumes
                                                key={`${index}-${playing}`}
                                                className="absolute inset-0 origin-left rounded-full bg-white"
                                                style={
                                                    playing
                                                        ? { animation: `hero-progress ${INTERVAL_MS}ms linear forwards` }
                                                        : undefined
                                                }
                                            />
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <button type="button" onClick={() => go(index - 1)} aria-label="Previous message" className={roundBtn}>
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserPaused((p) => !p)}
                            aria-label={userPaused ? "Resume automatic rotation" : "Pause automatic rotation"}
                            className={roundBtn}
                        >
                            {userPaused ? <Play size={16} /> : <Pause size={16} />}
                        </button>
                        <button type="button" onClick={() => go(index + 1)} aria-label="Next message" className={roundBtn}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
