import type { PeriodType } from "@/data/bulletin";

// Past bulletins. To add one: drop the PDF into /public/bulletins and add an
// entry here. The archive search on /bulletin reads title, theme, summary,
// date label and type.
export type ArchiveItem = {
  id: string;
  periodType: PeriodType;
  date: string; // ISO date, used for sorting and the year filter
  dateLabel: string; // what visitors see, e.g. "19 September 2026"
  title: string;
  theme?: string;
  summary: string;
  pdf: string; // path under /public
  size?: string;
};

export const archive: ArchiveItem[] = [
  {
    "id": "weekly-2026-10-10",
    "periodType": "weekly",
    "date": "2026-10-10",
    "dateLabel": "10 October 2026",
    "title": "Sabbath Bulletin - 10 October 2026",
    "theme": "Called to Serve",
    "summary": "Sabbath service on serving the church and community, with Women's Prayer Breakfast reminder.",
    "pdf": "/bulletins/weekly-2026-10-10.pdf",
    "size": "2 KB"
  },
  {
    "id": "weekly-2026-10-03",
    "periodType": "weekly",
    "date": "2026-10-03",
    "dateLabel": "3 October 2026",
    "title": "Sabbath Bulletin - 3 October 2026",
    "theme": "A Cheerful Giver",
    "summary": "A message on joyful stewardship; community health screening report shared.",
    "pdf": "/bulletins/weekly-2026-10-03.pdf",
    "size": "2 KB"
  },
  {
    "id": "weekly-2026-09-26",
    "periodType": "weekly",
    "date": "2026-09-26",
    "dateLabel": "26 September 2026",
    "title": "Sabbath Bulletin - 26 September 2026",
    "theme": "Quarterly Baptism Sabbath",
    "summary": "New members welcomed through baptism during the Divine Service.",
    "pdf": "/bulletins/weekly-2026-09-26.pdf",
    "size": "2 KB"
  },
  {
    "id": "weekly-2026-09-19",
    "periodType": "weekly",
    "date": "2026-09-19",
    "dateLabel": "19 September 2026",
    "title": "Sabbath Bulletin - 19 September 2026",
    "theme": "Believe and Live",
    "summary": "Divine Service message building on the Camp Meeting 2026 theme.",
    "pdf": "/bulletins/weekly-2026-09-19.pdf",
    "size": "2 KB"
  },
  {
    "id": "weekly-2026-09-12",
    "periodType": "weekly",
    "date": "2026-09-12",
    "dateLabel": "12 September 2026",
    "title": "Sabbath Bulletin - 12 September 2026",
    "theme": "Faith That Works",
    "summary": "Sabbath School lesson review and a message on faith in action.",
    "pdf": "/bulletins/weekly-2026-09-12.pdf",
    "size": "2 KB"
  },
  {
    "id": "weekly-2026-09-05",
    "periodType": "weekly",
    "date": "2026-09-05",
    "dateLabel": "5 September 2026",
    "title": "Sabbath Bulletin - 5 September 2026",
    "theme": "Rooted in the Word",
    "summary": "Start of the new term for children's and youth ministries.",
    "pdf": "/bulletins/weekly-2026-09-05.pdf",
    "size": "2 KB"
  },
  {
    "id": "monthly-2026-09",
    "periodType": "monthly",
    "date": "2026-09-01",
    "dateLabel": "September 2026",
    "title": "September 2026 Monthly Bulletin",
    "summary": "Ministry meetings, Ibisil mission preparation, and the quarterly baptism.",
    "pdf": "/bulletins/monthly-2026-09.pdf",
    "size": "2 KB"
  },
  {
    "id": "weekly-2026-08-29",
    "periodType": "weekly",
    "date": "2026-08-29",
    "dateLabel": "29 August 2026",
    "title": "Sabbath Bulletin - 29 August 2026",
    "theme": "Back to School Blessing",
    "summary": "Prayer for students and teachers at the start of the school term.",
    "pdf": "/bulletins/weekly-2026-08-29.pdf",
    "size": "2 KB"
  },
  {
    "id": "weekly-2026-08-22",
    "periodType": "weekly",
    "date": "2026-08-22",
    "dateLabel": "22 August 2026",
    "title": "Sabbath Bulletin - 22 August 2026",
    "theme": "Walking in Obedience",
    "summary": "Reflections following Camp Meeting; testimonies from the week.",
    "pdf": "/bulletins/weekly-2026-08-22.pdf",
    "size": "2 KB"
  },
  {
    "id": "weekly-2026-08-15",
    "periodType": "weekly",
    "date": "2026-08-15",
    "dateLabel": "15 August 2026",
    "title": "Sabbath Bulletin - 15 August 2026",
    "theme": "Camp Meeting Closing Sabbath",
    "summary": "Closing Sabbath of Camp Meeting 2026 with communion and consecration.",
    "pdf": "/bulletins/weekly-2026-08-15.pdf",
    "size": "2 KB"
  },
  {
    "id": "weekly-2026-08-08",
    "periodType": "weekly",
    "date": "2026-08-08",
    "dateLabel": "8 August 2026",
    "title": "Sabbath Bulletin - 8 August 2026",
    "theme": "Camp Meeting Opening Sabbath",
    "summary": "Opening Sabbath of Camp Meeting 2026 - Believe and Live.",
    "pdf": "/bulletins/weekly-2026-08-08.pdf",
    "size": "2 KB"
  },
  {
    "id": "monthly-2026-08",
    "periodType": "monthly",
    "date": "2026-08-01",
    "dateLabel": "August 2026",
    "title": "August 2026 Monthly Bulletin",
    "summary": "Camp Meeting 2026 programme, giving and volunteer information.",
    "pdf": "/bulletins/monthly-2026-08.pdf",
    "size": "2 KB"
  },
  {
    "id": "monthly-2026-07",
    "periodType": "monthly",
    "date": "2026-07-01",
    "dateLabel": "July 2026",
    "title": "July 2026 Monthly Bulletin",
    "summary": "Camp Meeting preparations, choir rehearsals, and outreach schedule.",
    "pdf": "/bulletins/monthly-2026-07.pdf",
    "size": "2 KB"
  },
  {
    "id": "quarterly-2026-q3",
    "periodType": "quarterly",
    "date": "2026-07-01",
    "dateLabel": "Q3 2026 (Jul-Sep)",
    "title": "Q3 2026 (Jul-Sep) Quarterly Bulletin",
    "summary": "Camp Meeting 2026, mid-year giving report, and the Ibisil mission campaign.",
    "pdf": "/bulletins/quarterly-2026-q3.pdf",
    "size": "2 KB"
  },
  {
    "id": "monthly-2026-06",
    "periodType": "monthly",
    "date": "2026-06-01",
    "dateLabel": "June 2026",
    "title": "June 2026 Monthly Bulletin",
    "summary": "Mid-year review, youth programmes, and health ministry updates.",
    "pdf": "/bulletins/monthly-2026-06.pdf",
    "size": "2 KB"
  },
  {
    "id": "monthly-2026-05",
    "periodType": "monthly",
    "date": "2026-05-01",
    "dateLabel": "May 2026",
    "title": "May 2026 Monthly Bulletin",
    "summary": "Mother's Day programme, Pathfinders investiture, and community service.",
    "pdf": "/bulletins/monthly-2026-05.pdf",
    "size": "2 KB"
  },
  {
    "id": "quarterly-2026-q2",
    "periodType": "quarterly",
    "date": "2026-04-01",
    "dateLabel": "Q2 2026 (Apr-Jun)",
    "title": "Q2 2026 (Apr-Jun) Quarterly Bulletin",
    "summary": "Easter programmes, Sabbath School outreach, and quarterly financial report.",
    "pdf": "/bulletins/quarterly-2026-q2.pdf",
    "size": "2 KB"
  },
  {
    "id": "quarterly-2026-q1",
    "periodType": "quarterly",
    "date": "2026-01-01",
    "dateLabel": "Q1 2026 (Jan-Mar)",
    "title": "Q1 2026 (Jan-Mar) Quarterly Bulletin",
    "summary": "Year-opening prayer week, new members' class, and Q1 report.",
    "pdf": "/bulletins/quarterly-2026-q1.pdf",
    "size": "2 KB"
  },
  {
    "id": "quarterly-2025-q4",
    "periodType": "quarterly",
    "date": "2025-10-01",
    "dateLabel": "Q4 2025 (Oct-Dec)",
    "title": "Q4 2025 (Oct-Dec) Quarterly Bulletin",
    "summary": "Year-end baptism, Christmas programme, and annual planning.",
    "pdf": "/bulletins/quarterly-2025-q4.pdf",
    "size": "2 KB"
  },
  {
    "id": "yearly-2025",
    "periodType": "yearly",
    "date": "2025-01-01",
    "dateLabel": "2025",
    "title": "2025 Yearly Bulletin",
    "summary": "Annual report for 2025: membership, finances, and ministry highlights.",
    "pdf": "/bulletins/yearly-2025.pdf",
    "size": "2 KB"
  },
  {
    "id": "yearly-2024",
    "periodType": "yearly",
    "date": "2024-01-01",
    "dateLabel": "2024",
    "title": "2024 Yearly Bulletin",
    "summary": "Annual report for 2024: membership, finances, and ministry highlights.",
    "pdf": "/bulletins/yearly-2024.pdf",
    "size": "2 KB"
  },
  {
    "id": "yearly-2023",
    "periodType": "yearly",
    "date": "2023-01-01",
    "dateLabel": "2023",
    "title": "2023 Yearly Bulletin",
    "summary": "Annual report for 2023: membership, finances, and ministry highlights.",
    "pdf": "/bulletins/yearly-2023.pdf",
    "size": "2 KB"
  }
];
