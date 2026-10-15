"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Loader2,
  X,
  XCircle,
} from "lucide-react";
import { FloatingInput, FloatingSelect, Toggle } from "@/components/GivingFields";
import { giving, LIVE } from "@/lib/giving/api";
import { MAX_POLLS, POLL_MS } from "@/lib/giving/config";
import { interpretStatus } from "@/lib/giving/status";
import type { ChurchUnit, PaymentType } from "@/lib/giving/types";

/* ------------------------------------------------------------------ *
 * Giving flow: details -> amounts -> M-Pesa prompt -> confirmation.
 * Talks to the backend through lib/giving (server actions over GraphQL)
 * when NEXT_PUBLIC_GRAPHQL_URL is set; otherwise it runs on built-in
 * sample data and no payment is made.
 * ------------------------------------------------------------------ */

// Tithe and Local Church Budget are always shown; every other category is
// added on request.
const FIXED_TYPE_PATTERNS = [/tithe/i, /local\s*church\s*budget/i];
const isFixed = (p: PaymentType) =>
  FIXED_TYPE_PATTERNS.some((re) => re.test(p.description) || re.test(p.code));

const GIVING_STEPS = [
  "Enter your correct Safaricom phone number",
  "Enter an amount for any giving categories you'd like",
  "Click on the submit button",
  "You will receive a prompt on your phone to enter your M-PESA pin",
  "Enter your M-PESA pin",
  "You will receive a confirmation message on your phone",
  "Wait for the receipt to be sent to you by SMS/email",
];

const FUNDS = [
  { name: "Local Church Budget", note: "Keeps the lights on — utilities, upkeep, and day-to-day ministry." },
  { name: "Tithe", note: "Supports the wider work of the denomination, per biblical principle." },
  { name: "Mission Offering", note: "Funds outreach campaigns like the Ibisil mission trip." },
  { name: "Church Building Fund", note: "Toward the sanctuary expansion project." },
];

const PHONE_RE = /^(?:\+?254|0)?[17]\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHOLE_RE = /^\d+$/;

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// M-Pesa takes whole shillings only.
const amountError = (v?: string) =>
  v && v.trim() !== "" && !WHOLE_RE.test(v.trim()) ? "Enter whole shillings, e.g. 500" : "";

// processing: waiting for the giver to enter their PIN and M-Pesa to answer
// done:       M-Pesa confirmed the payment (the only path to the thank-you screen)
// failed:     declined/cancelled/wrong PIN, OR no confirmation arrived in time
type Phase = "processing" | "done" | "failed";
type FailureKind = "declined" | "unconfirmed";

export default function GivingPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phase, setPhase] = useState<Phase>("processing");

  // details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [unit, setUnit] = useState("");
  const [remember, setRemember] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // options from the backend
  const [payTypes, setPayTypes] = useState<PaymentType[]>([]);
  const [typesStatus, setTypesStatus] = useState<"loading" | "ready" | "error">("loading");
  const [units, setUnits] = useState<ChurchUnit[]>([]);
  const [unitsFailed, setUnitsFailed] = useState(false);

  // giving
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<string[]>([]);
  const [giveError, setGiveError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // payment status
  const [paymentId, setPaymentId] = useState("");
  const [pollKey, setPollKey] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [reference, setReference] = useState("");
  const [failureKind, setFailureKind] = useState<FailureKind>("declined");

  const [showInstructions, setShowInstructions] = useState(false);

  /* ---------- load giving categories and church units ---------- */
  const loadOptions = useCallback(async () => {
    setTypesStatus("loading");
    setUnitsFailed(false);
    const [types, churchUnits] = await Promise.allSettled([
      giving.getPaymentTypes(),
      giving.getChurchUnits(),
    ]);
    if (types.status === "fulfilled") {
      setPayTypes(types.value);
      setTypesStatus("ready");
    } else {
      setTypesStatus("error");
    }
    if (churchUnits.status === "fulfilled") setUnits(churchUnits.value);
    else setUnitsFailed(true);
  }, []);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  /* ---------- validation (name + phone required, email optional) ---------- */
  const errors = {
    name: name.trim() === "" ? "Name is a required field!" : "",
    phone:
      phone.trim() === ""
        ? "Phone number is a required field! e.g. 07xxxxxxxx"
        : !PHONE_RE.test(phone.trim().replace(/\s+/g, ""))
        ? "Invalid phone number!"
        : "",
    email: email.trim() !== "" && !EMAIL_RE.test(email.trim()) ? "Invalid email address!" : "",
  };
  const showError = (field: keyof typeof errors) => (touched[field] ? errors[field] : "");
  const hasErrors = Boolean(errors.name || errors.phone || errors.email);

  /* ---------- giving lines ---------- */
  const fixedTypes = payTypes.filter(isFixed);
  const addedTypes = added
    .map((code) => payTypes.find((p) => p.code === code))
    .filter((p): p is PaymentType => Boolean(p));
  const availableTypes = payTypes.filter((p) => !isFixed(p) && !added.includes(p.code));

  const lines = [...fixedTypes, ...addedTypes]
    .map((p) => ({ ...p, amount: Number(amounts[p.code]?.trim()) }))
    .filter(
      (l) => WHOLE_RE.test(amounts[l.code]?.trim() ?? "") && Number.isInteger(l.amount) && l.amount > 0
    );
  const total = lines.reduce((sum, l) => sum + l.amount, 0);

  const setAmount = (code: string, value: string) => {
    setGiveError("");
    setAmounts((prev) => ({ ...prev, [code]: value }));
  };

  const removeCategory = (code: string) => {
    setAdded((prev) => prev.filter((c) => c !== code));
    setAmounts((prev) => {
      const next = { ...prev };
      delete next[code];
      return next;
    });
  };

  /* ---------- actions ---------- */
  const handleNext = () => {
    setTouched({ name: true, phone: true, email: true });
    if (!hasErrors) setStep(2);
  };

  const handleGive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if ([...fixedTypes, ...addedTypes].some((p) => amountError(amounts[p.code]))) {
      setGiveError("Please correct the highlighted amounts.");
      return;
    }
    if (total <= 0) {
      setGiveError("Oops! It looks like there are no contributions entered. Please check and try again.");
      return;
    }

    setSubmitting(true);
    setGiveError("");
    const res = await giving.initiatePayment({
      name: name.trim(),
      phone: phone.trim().replace(/\s+/g, ""),
      email: email.trim(),
      unit: unit || undefined,
      lines: lines.map((l) => ({ code: l.code, amount: l.amount })),
    });
    setSubmitting(false);

    if (!res.result) {
      setGiveError(res.errors?.[0]?.message || "Something went wrong. Please try again.");
      return;
    }
    setPaymentId(res.result.id ?? "");
    setResultMessage("");
    setReference("");
    setPhase("processing");
    setStep(3);
  };

  const giveAgain = () => {
    setAmounts({});
    setAdded([]);
    setGiveError("");
    if (!remember) {
      setName("");
      setPhone("");
      setEmail("");
      setUnit("");
      setTouched({});
    }
    setStep(1);
  };

  /* ---------- poll the payment until it completes or fails ---------- */
  useEffect(() => {
    if (step !== 3 || phase !== "processing" || !paymentId) return;
    let cancelled = false;
    let attempts = 0;
    let failures = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = async () => {
      if (cancelled) return;
      attempts += 1;
      const res = await giving.getPaymentStatus(paymentId);
      if (cancelled) return;

      if (res.result) {
        failures = 0;
        const outcome = interpretStatus(res.result);
        if (outcome === "success") {
          setReference(res.result.reference);
          setResultMessage(res.result.ResultDescription);
          setPhase("done");
          return;
        }
        if (outcome === "failed") {
          setFailureKind("declined");
          // A COMPLETED status with a bad result code is a mixed signal: don't
          // show a "processed successfully" message under a failure.
          setResultMessage(
            res.result.state === "COMPLETED"
              ? "We couldn't confirm this payment."
              : res.result.ResultDescription
          );
          setPhase("failed");
          return;
        }
        // "pending": still waiting for the PIN response, keep asking
      } else if (++failures >= 3) {
        setFailureKind("unconfirmed");
        setResultMessage(res.errors?.[0]?.message ?? "We couldn't check your payment.");
        setPhase("failed");
        return;
      }

      // No PIN response in time: report the payment as not confirmed. It is
      // never shown as successful without a confirmation.
      if (attempts >= MAX_POLLS) {
        setFailureKind("unconfirmed");
        setResultMessage("");
        setPhase("failed");
        return;
      }

      timer = setTimeout(tick, POLL_MS);
    };

    timer = setTimeout(tick, POLL_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [step, phase, paymentId, pollKey]);

  // Instructions modal: Escape closes it, and the page behind stops scrolling.
  useEffect(() => {
    if (!showInstructions) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowInstructions(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [showInstructions]);

  const primaryBtn =
    "inline-flex w-full items-center justify-center gap-2 rounded-full bg-maroon-600 px-7 py-3 font-semibold text-white shadow-md transition-colors hover:bg-maroon-700 disabled:cursor-not-allowed disabled:opacity-70";

  return (
    <div>
      {/* Hero — the transparent site header floats over this */}
      <section className="relative overflow-hidden text-white">
        <Image src="/hero-church.png" alt="" fill priority className="-z-10 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-maroon-900/85 via-maroon-800/65 to-maroon-700/40" />

        <div className="relative z-10 mx-auto max-w-lg px-6 pb-20 pt-28 text-center sm:pb-24 sm:pt-32">
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Give with a cheerful heart</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
            Support the church&apos;s tithes, offerings, development and church budget in a few taps,
            right from your phone.
          </p>
        </div>
      </section>

      {/* Form card — overlaps the hero */}
      <div className="relative z-20 -mt-10 px-4 pb-16 sm:-mt-12">
        <div className="mx-auto w-full max-w-md sm:max-w-lg">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
            {step < 3 && (
              <form onSubmit={handleGive} noValidate>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">Step {step} of 2</p>
                <h2 className="mt-1 font-serif text-2xl">{step === 1 ? "Your details" : "Your giving"}</h2>
                <div className="mt-3 flex gap-2" aria-hidden="true">
                  <span className="h-1 flex-1 rounded-full bg-maroon-600" />
                  <span
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      step === 2 ? "bg-maroon-600" : "bg-gray-200"
                    }`}
                  />
                </div>

                {step === 1 && (
                  <div className="mt-6 flex flex-col gap-y-4">
                    <FloatingInput
                      id="name"
                      label="Name"
                      value={name}
                      onChange={setName}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      error={showError("name")}
                      autoComplete="name"
                    />
                    <FloatingInput
                      id="phone"
                      label="Phone No."
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={setPhone}
                      onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                      error={showError("phone")}
                      autoComplete="tel"
                    />
                    <FloatingInput
                      id="email"
                      label="Email (optional)"
                      type="email"
                      inputMode="email"
                      value={email}
                      onChange={setEmail}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      error={showError("email")}
                      autoComplete="email"
                    />
                    <div>
                      <FloatingSelect id="unit" label="Church unit (optional)" value={unit} onChange={setUnit}>
                        <option value="">Select church unit…</option>
                        {units.map((u) => (
                          <option key={u.id} value={u.pk}>
                            {u.name}
                          </option>
                        ))}
                      </FloatingSelect>
                      {unitsFailed && (
                        <p className="mt-1 text-xs text-gray-500">
                          Church units couldn&apos;t be loaded — you can still continue.
                        </p>
                      )}
                    </div>

                    {/* Not persisted yet: wire to the real encrypted save/restore */}
                    <Toggle checked={remember} onChange={setRemember} label="Remember me" />

                    <button type="button" onClick={handleNext} className={`${primaryBtn} mt-2`}>
                      Next <ChevronRight size={18} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-6 flex flex-col gap-y-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1 self-start text-sm font-semibold text-gray-600 hover:text-maroon-700"
                    >
                      <ChevronLeft size={18} /> Go back
                    </button>

                    {typesStatus === "loading" && (
                      <p className="flex items-center gap-2 text-sm text-gray-500" role="status">
                        <Loader2 size={16} className="animate-spin" /> Loading giving categories…
                      </p>
                    )}

                    {typesStatus === "error" && (
                      <div className="rounded-lg bg-red-50 px-3 py-3 text-sm text-red-700" role="alert">
                        We couldn&apos;t load the giving categories.{" "}
                        <button type="button" onClick={loadOptions} className="font-semibold underline">
                          Try again
                        </button>
                      </div>
                    )}

                    {typesStatus === "ready" && payTypes.length === 0 && (
                      <p className="text-sm text-gray-500">No giving categories are available right now.</p>
                    )}

                    {typesStatus === "ready" && payTypes.length > 0 && (
                      <>
                        <p className="-mt-1 text-sm text-gray-500">
                          Every amount below is optional — give as you&apos;re led.
                        </p>

                        {fixedTypes.map((p) => (
                          <FloatingInput
                            key={p.code}
                            id={`amt-${p.code}`}
                            label={p.description}
                            type="number"
                            inputMode="numeric"
                            min={0}
                            step={1}
                            value={amounts[p.code] ?? ""}
                            onChange={(v) => setAmount(p.code, v)}
                            error={amountError(amounts[p.code])}
                          />
                        ))}

                        {addedTypes.map((p) => (
                          <div key={p.code} className="flex items-start gap-2">
                            <div className="flex-1">
                              <FloatingInput
                                id={`amt-${p.code}`}
                                label={p.description}
                                type="number"
                                inputMode="numeric"
                                min={0}
                                step={1}
                                value={amounts[p.code] ?? ""}
                                onChange={(v) => setAmount(p.code, v)}
                                error={amountError(amounts[p.code])}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeCategory(p.code)}
                              aria-label={`Remove ${p.description}`}
                              className="mt-3 shrink-0 text-gray-400 transition-colors hover:text-maroon-600"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        ))}

                        {availableTypes.length > 0 && (
                          <FloatingSelect
                            id="add-category"
                            label="Add another giving category"
                            value=""
                            onChange={(code) => code && setAdded((prev) => [...prev, code])}
                          >
                            <option value="">Choose a category…</option>
                            {availableTypes.map((p) => (
                              <option key={p.code} value={p.code}>
                                {p.description}
                              </option>
                            ))}
                          </FloatingSelect>
                        )}
                      </>
                    )}

                    {giveError && (
                      <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        {giveError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting || typesStatus !== "ready"}
                      className={`${primaryBtn} mt-2`}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Sending request…
                        </>
                      ) : (
                        <>Give KES {fmt(total)}</>
                      )}
                    </button>
                  </div>
                )}
              </form>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center gap-y-3 py-4 text-center" aria-live="polite">
                {phase === "processing" && (
                  <>
                    <Loader2 size={56} className="animate-spin text-maroon-600" />
                    <p className="text-lg font-semibold text-gray-900">
                      Transaction initiated. Please enter your M-Pesa PIN on your phone.
                    </p>
                    <p className="text-sm text-gray-500">
                      Confirming your payment — this usually takes a few seconds.
                    </p>
                  </>
                )}

                {phase === "done" && (
                  <>
                    <CheckCircle2 size={64} className="text-green-500" />
                    <p className="text-xl font-semibold text-green-600">Thank you for giving!</p>
                    {resultMessage && <p className="text-sm text-gray-500">{resultMessage}</p>}
                    <div className="mt-2 w-full divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 text-left">
                      {lines.map((l) => (
                        <div key={l.code} className="flex justify-between px-4 py-2.5 text-sm">
                          <span className="text-gray-600">{l.description}</span>
                          <span className="font-semibold text-gray-900">KES {fmt(l.amount)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between bg-maroon-50 px-4 py-2.5 text-sm font-semibold text-maroon-800">
                        <span>Total</span>
                        <span>KES {fmt(total)}</span>
                      </div>
                    </div>
                    {reference && <p className="text-xs text-gray-500">Reference: {reference}</p>}
                    {!LIVE && <p className="text-xs text-gray-400">Draft only — no payment was made.</p>}
                    <button type="button" onClick={giveAgain} className={`${primaryBtn} mt-2`}>
                      Give again
                    </button>
                    <Link href="/" className="text-sm font-semibold text-maroon-700 hover:underline">
                      Back home
                    </Link>
                  </>
                )}

                {phase === "failed" && (
                  <>
                    <XCircle size={64} className="text-red-500" />
                    {failureKind === "declined" ? (
                      <>
                        <p className="text-xl font-semibold text-red-600">
                          {resultMessage || "The payment didn't go through."}
                        </p>
                        <p className="text-sm text-gray-500">The payment was not completed. You can try again.</p>
                        <button
                          type="button"
                          onClick={() => {
                            setPhase("processing");
                            setStep(2);
                          }}
                          className={`${primaryBtn} mt-2`}
                        >
                          Try again
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-xl font-semibold text-red-600">Payment not confirmed</p>
                        <p className="text-sm text-gray-500">
                          {resultMessage ||
                            "We didn't receive your M-Pesa PIN confirmation, so this payment isn't complete."}
                        </p>
                        <p className="text-sm text-gray-500">
                          If money was deducted from your M-Pesa, please don&apos;t pay again — check your M-Pesa
                          messages or contact the church office.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setPhase("processing");
                            setPollKey((k) => k + 1);
                          }}
                          className={`${primaryBtn} mt-2`}
                        >
                          Check again
                        </button>
                        <button
                          type="button"
                          onClick={giveAgain}
                          className="text-sm font-semibold text-maroon-700 hover:underline"
                        >
                          Start a new gift
                        </button>
                      </>
                    )}
                    <Link href="/" className="text-sm font-semibold text-maroon-700 hover:underline">
                      Back home
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {step < 3 && !LIVE && (
            <p className="mt-4 text-center text-xs text-gray-400">
              Draft — this form isn&apos;t connected to M-Pesa yet.
            </p>
          )}
        </div>
      </div>

      {/* Where your giving goes */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">Transparency</span>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Where your giving goes</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {FUNDS.map((fund) => (
              <div key={fund.name} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="font-bold text-maroon-700">{fund.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{fund.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating help button */}
      <button
        type="button"
        onClick={() => setShowInstructions(true)}
        aria-label="How giving with M-Pesa works"
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-maroon-600 text-white shadow-lg transition-colors hover:bg-maroon-700 sm:bottom-6 sm:right-6 sm:h-14 sm:w-auto sm:px-5"
      >
        <Info size={24} />
        <span className="hidden text-sm font-semibold sm:inline">How it works</span>
      </button>

      {/* Instructions: bottom sheet on phones, centred dialog from sm up */}
      {showInstructions && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How giving with M-Pesa works"
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowInstructions(false)} />
          <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl sm:max-w-md sm:rounded-3xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 font-bold text-maroon-700">
                <Info size={24} className="shrink-0" />
                How giving with M-Pesa works
              </div>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                aria-label="Close"
                className="shrink-0 text-gray-400 transition-colors hover:text-maroon-700"
              >
                <X size={22} />
              </button>
            </div>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-gray-700">
              {GIVING_STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
