# KCC Website — Draft

A Next.js (App Router + TypeScript + Tailwind) draft of the sdackc.org
site structure: Home, Bulletin (weekly/monthly/quarterly/yearly), Events,
Ministries (+ detail pages), Giving, About, and Live — built in the same
maroon, card-based visual language as campmeeting.sdackc.org, so the two
sites can grow into one uniform family.

All content is mock data in `src/data/` — nothing is wired to a real
backend, CMS, or payment provider yet. It's meant to be something to click
through and react to before any of it gets built for real.

## Run it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## What's in here

```
src/
  app/
    page.tsx              Homepage — hero, this week, upcoming events,
                           ministries grid, giving banner, media teaser,
                           location
    bulletin/page.tsx      Weekly / Monthly / Quarterly / Yearly tab switcher
    events/page.tsx        Filterable events list
    ministries/page.tsx    Ministries index
    ministries/[slug]/     Ministry detail pages
    giving/page.tsx        Giving page mockup (fixed + addable categories)
    about/page.tsx         History, leadership, location, service times
    live/page.tsx          Livestream placeholder with a "not live" fallback
  components/
    Header.tsx, Footer.tsx, EventCard.tsx, MinistryCard.tsx
  data/
    bulletin.ts, events.ts, ministries.ts   — mock content
```

## Next steps

- Swap the mock data files for real data (a CMS, or the existing
  Django/Graphene backend already powering churchconnect.sdackc.org).
- Replace the map, hero, and media placeholders with real assets.
- Wire the Giving page into the real M-Pesa flow.
- Add a bulletin archive and an events calendar view.

## Bulletin PDFs and the archive

- The current weekly / monthly / quarterly / yearly bulletins each have a
  `pdf` path in `src/data/bulletin.ts`; the page shows Download PDF and
  Open in new tab buttons for them.
- Past bulletins live in `src/data/archive.ts` and appear in the searchable
  archive on `/bulletin` (search by title, theme, summary, date, or type;
  filter by type and year).
- To add one: put the PDF in `public/bulletins/` and add an entry to
  `archive.ts` (or update the `pdf` path in `bulletin.ts` for the current
  period).
- The PDFs in `public/bulletins/` are generated samples — replace them with
  the real files.

## Ministries: sections, classes, pictures and emblems

Any ministry can have `groups` (sections with their own page), and any group
can have `classes`. Examples in `src/data/ministries.ts`:

- Clubs -> Adventurers (Little Lamb ... Helping Hand), Pathfinders (Friend ...
  Guide), Master Guides
- Children's Ministry -> Kids in Discipleship (KID), Alive in Jesus
  (Beginner, Kindergarten, Primary, Junior, Earliteen)
- Music & Praise Team -> Praise Team, Church Choir, Instrumentalists

Ministries, groups and classes all accept an optional `image`, and groups and
classes accept an `emblem`. See `public/ministries/README.txt`. The age ranges
and class lists are draft content - confirm them with each department.

## Giving page (/giving)

Mirrors the real give-now flow in this site's theme: transparent header over a
hero, a form card overlapping it, step 1 (name, phone, optional email and
church unit, remember me) -> step 2 (Tithe and Local Church Budget always
shown, other categories added on request, every amount optional) -> mock
confirmation. A floating "How it works" button opens the M-Pesa instructions
(bottom sheet on phones, dialog on larger screens).

The floating-label fields live in `src/components/GivingFields.tsx`.

### Connecting giving to the backend

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_GRAPHQL_URL` (either
`http://127.0.0.1:8000` or `http://127.0.0.1:8000/graphql`). With it set, the
page uses the live GraphQL backend; without it, the page runs on built-in
sample data and no payment is made.

```
src/lib/apollo/client.ts               Apollo client (no caching - payment data is live)
src/lib/graphql/helpers.ts             extractNodes, pkFromGlobalId
src/lib/graphql/queries/giving.ts      PaymentTypes, ChurchUnits, initiatedPayment
src/lib/graphql/mutations/giving.ts    initiateMpesaExpressPayment
src/lib/giving/actions.ts              server actions the page calls
src/lib/giving/mock.ts                 sample data used when no backend URL is set
src/lib/giving/api.ts                  picks live or mock
```

Things worth knowing:
- `unit` is an Int in the mutation: the church unit's raw pk, sent as a real
  number (or null). The Relay `id` is decoded to get it. A string is rejected
  with HTTP 400.
- Amounts are whole shillings only. The backend runs `int()` on each amount,
  so a decimal would crash it; the form blocks decimals.
- After submitting, the page polls `initiatedPayment` every 3 seconds until it
  is COMPLETED or FAILED (and shows a "still waiting" state after about two
  minutes).
- "Remember me" is not persisted yet.
- The receipt page and the `transactions` query are not wired in this draft.
