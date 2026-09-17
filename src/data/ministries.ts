export type Ministry = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  meetingSchedule: string;
  leaders: string[];
  contact: string;
  emoji: string;
};

export const ministries: Ministry[] = [
  {
    slug: "children",
    name: "Children's Ministry",
    summary: "Sabbath School and discipleship for ages 0–12.",
    description:
      "We nurture the youngest members of our church family through age-appropriate Sabbath School classes, holiday programmes, and Vacation Bible School. Every child is known by name and prayed for by name.",
    meetingSchedule: "Sabbaths, 9:00 AM — Sabbath School hour",
    leaders: ["Sis. Grace Wanjiru", "Bro. Kevin Otieno"],
    contact: "children@sdackc.org",
    emoji: "🧸",
  },
  {
    slug: "women",
    name: "Women's Ministry",
    summary: "Fellowship, mentorship, and outreach for the women of KCC.",
    description:
      "A space for women to grow spiritually, support one another through life's seasons, and serve the wider community — from prayer breakfasts to outreach visits to families in need.",
    meetingSchedule: "Second Saturday of the month, 3:00 PM",
    leaders: ["Sis. Mercy Achieng"],
    contact: "women@sdackc.org",
    emoji: "🌸",
  },
  {
    slug: "men",
    name: "Men's Ministry",
    summary: "Discipleship, accountability, and service for the men of KCC.",
    description:
      "Building men who lead their homes and their community with integrity — through Bible study, mentorship of younger men, and hands-on service projects.",
    meetingSchedule: "Third Saturday of the month, 3:00 PM",
    leaders: ["Bro. Daniel Kimani"],
    contact: "men@sdackc.org",
    emoji: "🔨",
  },
  {
    slug: "young-adults",
    name: "Young Adults",
    summary: "Ages 18–35 — Bible study, fellowship, and life together.",
    description:
      "A community for young adults navigating career, relationships, and faith together — weekly Bible study, monthly fellowship events, and a strong presence in Ibisil mission outreach.",
    meetingSchedule: "Fridays, 6:30 PM — Vespers & Bible study",
    leaders: ["Bro. Allan Mutiso", "Sis. Faith Njoroge"],
    contact: "youngadults@sdackc.org",
    emoji: "🔥",
  },
  {
    slug: "pathfinders",
    name: "Pathfinders & Adventurers",
    summary: "Ages 5–15 — character, service, and outdoor adventure.",
    description:
      "Uniformed youth clubs building character, practical skills, and a love for service and the outdoors, grounded in Scripture.",
    meetingSchedule: "Sabbaths, 4:00 PM",
    leaders: ["Bro. Peter Ndegwa"],
    contact: "pathfinders@sdackc.org",
    emoji: "🧭",
  },
  {
    slug: "music",
    name: "Music & Praise Team",
    summary: "Leading the congregation in worship through song.",
    description:
      "Choirs, the praise team, and instrumentalists who prepare and lead worship music for Sabbath services and special programmes.",
    meetingSchedule: "Thursdays, 6:30 PM — rehearsal",
    leaders: ["Sis. Joan Mumbi"],
    contact: "music@sdackc.org",
    emoji: "🎵",
  },
  {
    slug: "health",
    name: "Health Ministries",
    summary: "Whole-person wellness for the church and community.",
    description:
      "Free health screenings, wellness talks, and practical guidance on the eight laws of health — for members and the surrounding community alike.",
    meetingSchedule: "Quarterly health outreach — see Events",
    leaders: ["Dr. Susan Wambui"],
    contact: "health@sdackc.org",
    emoji: "🩺",
  },
  {
    slug: "community-services",
    name: "Community Services",
    summary: "Practical care for families in need, in and beyond KCC.",
    description:
      "Food, clothing, and material support for families going through hardship, plus the church's outward-facing outreach efforts like the Ibisil mission campaign.",
    meetingSchedule: "By request — coordinated as needs arise",
    leaders: ["Sis. Ruth Kamau"],
    contact: "community@sdackc.org",
    emoji: "🤝",
  },
];
