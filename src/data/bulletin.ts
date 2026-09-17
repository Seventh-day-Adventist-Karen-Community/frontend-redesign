export type PeriodType = "weekly" | "monthly" | "quarterly" | "yearly";

export type Bulletin = {
  periodType: PeriodType;
  label: string;
  dateRange: string;
  orderOfService?: { time: string; item: string }[];
  sabbathSchoolLesson?: string;
  announcements: string[];
  offeringFocus: string;
};

export const bulletins: Record<PeriodType, Bulletin> = {
  weekly: {
    periodType: "weekly",
    label: "This Week",
    dateRange: "Sabbath, 20 September 2026",
    orderOfService: [
      { time: "9:00 AM", item: "Sabbath School" },
      { time: "11:00 AM", item: "Divine Service — Message: \"Believe and Live\"" },
      { time: "1:00 PM", item: "Fellowship Lunch" },
      { time: "4:00 PM", item: "Pathfinders Club" },
    ],
    sabbathSchoolLesson: "Lesson 12 — \"Faith That Works\"",
    announcements: [
      "Quarterly baptism is scheduled for next Sabbath — speak to an elder if you'd like to be baptised.",
      "The Ibisil Mission Campaign sign-up sheet is at the welcome desk.",
      "Choir rehearsal moves to Thursday this week due to the mid-week prayer meeting.",
    ],
    offeringFocus: "Local Church Budget",
  },
  monthly: {
    periodType: "monthly",
    label: "September 2026",
    dateRange: "1–30 September 2026",
    announcements: [
      "Women's Ministry Prayer Breakfast — 2nd Saturday.",
      "Men's Ministry meeting — 3rd Saturday.",
      "Community Health Screening — 4 October.",
    ],
    offeringFocus: "Evangelism Fund",
  },
  quarterly: {
    periodType: "quarterly",
    label: "Q3 2026 (Jul–Sep)",
    dateRange: "1 July – 30 September 2026",
    announcements: [
      "Q3 tithe and offering report will be presented at the next church business meeting.",
      "Ibisil Mission Campaign — the quarter's major outreach initiative.",
      "New members' class concludes with baptism this quarter.",
    ],
    offeringFocus: "Mission Offering",
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
  },
};
