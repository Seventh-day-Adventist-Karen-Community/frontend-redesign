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
