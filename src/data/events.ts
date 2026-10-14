export type Event = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  time: string;
  location: string;
  department: string;
  featured?: boolean;
};

export const events: Event[] = [
  {
    slug: "ibisil-mission-campaign",
    title: "Ibisil Mission Campaign",
    description:
      "A youth-led evangelistic mission to Ibisil, Kajiado — a week of outreach, health screenings, and evangelistic meetings.",
    date: "2026-11-07",
    time: "All day",
    location: "Ibisil, Kajiado County",
    department: "Young Adults",
    featured: true,
  },
  {
    slug: "quarterly-baptism",
    title: "Quarterly Baptism",
    description:
      "New members are welcomed into the church family through baptism during the Divine Service.",
    date: "2026-10-24",
    time: "11:00 AM",
    location: "Main Sanctuary",
    department: "Church Board",
    featured: true,
  },
  {
    slug: "health-outreach",
    title: "Community Health Screening",
    description:
      "Free blood pressure, blood sugar, and BMI screening for church members and the surrounding neighbourhood.",
    date: "2026-10-31",
    time: "8:00 AM – 1:00 PM",
    location: "Church Grounds",
    department: "Health Ministries",
  },
  {
    slug: "womens-prayer-breakfast",
    title: "Women's Prayer Breakfast",
    description: "A morning of fellowship, testimony, and prayer for the women of KCC.",
    date: "2026-11-14",
    time: "8:00 AM",
    location: "Fellowship Hall",
    department: "Women's Ministry",
  },
  {
    slug: "pathfinders-camporee",
    title: "Pathfinders Camporee",
    description: "An overnight camping and skills weekend for our Pathfinders club.",
    date: "2026-11-28",
    time: "Fri 3:00 PM – Sun 12:00 PM",
    location: "Karura Forest Campsite",
    department: "Pathfinders & Adventurers",
  },
  {
    slug: "vespers-young-adults",
    title: "Young Adults Vespers Night",
    description: "Sunset worship and testimony night, open to all young adults.",
    date: "2026-10-23",
    time: "6:30 PM",
    location: "Fellowship Hall",
    department: "Young Adults",
  },
];
