"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const FIXED_CATEGORIES = ["Tithe", "Local Church Budget"];
const OTHER_CATEGORIES = [
    "Evangelism Fund",
    "Mission Offering",
    "Church Building Fund",
    "Community Services",
];

const FUNDS = [
    { name: "Local Church Budget", note: "Keeps the lights on — utilities, upkeep, and day-to-day ministry." },
    { name: "Tithe", note: "Supports the wider work of the denomination, per biblical principle." },
    { name: "Mission Offering", note: "Funds outreach campaigns like the Ibisil mission trip." },
    { name: "Church Building Fund", note: "Toward the sanctuary expansion project." },
];

export default function GivingPage() {
    const [added, setAdded] = useState<string[]>([]);
    const available = OTHER_CATEGORIES.filter((c) => !added.includes(c));

    return (
        <div>
            {/* Hero — same transparent-header treatment as the homepage; the
          header itself decides it's transparent here via HERO_ROUTES in
          Header.tsx. Extra top padding (pt-24+) clears the floating nav. */}
            <section className="relative overflow-hidden text-white">
                <Image
                    src="/hero-church.png"
                    alt=""
                    fill
                    priority
                    className="object-cover object-center -z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/85 via-maroon-800/60 to-maroon-700/30 -z-10" />

                <div className="relative z-10 max-w-lg mx-auto px-6 pt-24 sm:pt-28 pb-14 text-center">
                    <h1 className="font-serif text-4xl sm:text-5xl leading-tight">Give with a cheerful heart</h1>
                    <p className="mt-4 text-maroon-50/90">
                        Support the church's tithes and offerings in a few taps.
                    </p>
                </div>
            </section>

            <div className="max-w-md mx-auto px-4 -mt-8 pb-20">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <p className="text-sm text-gray-500 mb-4">
                        Every amount below is optional — give as you're led. (Draft only — this form isn't
                        wired up to a real payment flow.)
                    </p>

                    <div className="space-y-3">
                        {FIXED_CATEGORIES.map((cat) => (
                            <div key={cat}>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">{cat}</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-maroon-500"
                                />
                            </div>
                        ))}

                        {added.map((cat) => (
                            <div key={cat} className="flex items-end gap-2">
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">{cat}</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-maroon-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setAdded((prev) => prev.filter((c) => c !== cat))}
                                    className="mb-2.5 text-gray-400 hover:text-maroon-600"
                                    aria-label={`Remove ${cat}`}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {available.length > 0 && (
                        <div className="mt-4">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">
                                Add another giving category
                            </label>
                            <select
                                defaultValue=""
                                onChange={(e) => {
                                    if (e.target.value) setAdded((prev) => [...prev, e.target.value]);
                                    e.target.value = "";
                                }}
                                className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-maroon-500"
                            >
                                <option value="" disabled>
                                    Choose a category…
                                </option>
                                {available.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button
                        type="button"
                        className="w-full mt-6 bg-maroon-600 hover:bg-maroon-700 text-white font-semibold py-3 rounded-full transition-colors"
                    >
                        Give KES 0.00
                    </button>
                </div>

                <div className="mt-10">
                    <h2 className="text-sm font-semibold text-gray-900 mb-3">Where your giving goes</h2>
                    <div className="space-y-3">
                        {FUNDS.map((fund) => (
                            <div key={fund.name} className="bg-white rounded-xl border border-gray-100 p-4">
                                <p className="text-sm font-semibold text-gray-900">{fund.name}</p>
                                <p className="text-sm text-gray-500 mt-0.5">{fund.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
