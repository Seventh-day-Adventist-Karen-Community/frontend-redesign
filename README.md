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
