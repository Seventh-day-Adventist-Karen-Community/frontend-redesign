export type PeriodType = "weekly" | "monthly" | "quarterly" | "yearly";

export type Bulletin = {
  periodType: PeriodType;
  label: string;
  dateRange: string;
  orderOfService?: { time: string; item: string }[];
  sabbathSchoolLesson?: string;
  announcements: string[];
  offeringFocus: string;
  // Uploaded PDF for this period, served from /public/bulletins
  pdf: string;
};

export const bulletins: Record<PeriodType, Bulletin> = {
  weekly: {
    periodType: "weekly",
    label: "This Week",
    dateRange: "Sabbath, 17 October 2026",
    orderOfService: [
      { time: "9:00 AM", item: "Sabbath School" },
      { time: "11:00 AM", item: "Divine Service — Message: \"Believe and Live\"" },
      { time: "1:00 PM", item: "Fellowship Lunch" },
      { time: "4:00 PM", item: "Pathfinders Club" },
    ],
    sabbathSchoolLesson: "Lesson 3 — \"Faith That Works\"",
    announcements: [
      "Pathfinders Camporee registration closes this Sabbath — see the welcome desk.",
      "Choir rehearsal moves to Thursday this week due to the mid-week prayer meeting.",
      "Testimonies from the Ibisil Mission Campaign during the afternoon programme.",
    ],
    offeringFocus: "Local Church Budget",
    pdf: "/bulletins/weekly-2026-10-17.pdf",
  },
  monthly: {
    periodType: "monthly",
    label: "October 2026",
    dateRange: "1–31 October 2026",
    announcements: [
      "Women's Prayer Breakfast — 2nd Saturday.",
      "Men's Ministry meeting — 3rd Saturday.",
      "Pathfinders Camporee registration is open.",
    ],
    offeringFocus: "Evangelism Fund",
    pdf: "/bulletins/monthly-2026-10.pdf",
  },
  quarterly: {
    periodType: "quarterly",
    label: "Q4 2026 (Oct–Dec)",
    dateRange: "1 October – 31 December 2026",
    announcements: [
      "Q3 tithe and offering report presented at the church business meeting.",
      "Year-end baptism and Christmas programmes in planning.",
      "Pathfinders Camporee — the quarter's major youth event.",
    ],
    offeringFocus: "Mission Offering",
    pdf: "/bulletins/quarterly-2026-q4.pdf",
  },
  yearly: {
    periodType: "yearly",
    label: "2026",
    dateRange: "1 January – 31 December 2026",
    announcements: [
      "Camp Meeting 2026 — \"Believe and Live\" — 8–15 August.",
      "Annual church business meeting — December.",
      "Full year report available for download after the December business meeting.",
    ],
    offeringFocus: "Church Building Fund",
    pdf: "/bulletins/yearly-2026.pdf",
  },
};
