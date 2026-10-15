const positive = (value: string | undefined, fallback: number) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

// How often to ask the backend whether the giver has entered their PIN, and
// how many times before the page stops waiting and reports the payment as
// not confirmed. Defaults: every 3s for about 2 minutes (the phone prompt
// itself expires after roughly a minute). Both can be tuned with
// NEXT_PUBLIC_GIVING_POLL_MS and NEXT_PUBLIC_GIVING_MAX_POLLS.
const live = Boolean(process.env.NEXT_PUBLIC_GRAPHQL_URL);
export const POLL_MS = positive(process.env.NEXT_PUBLIC_GIVING_POLL_MS, live ? 3000 : 1500);
export const MAX_POLLS = positive(process.env.NEXT_PUBLIC_GIVING_MAX_POLLS, 40);
