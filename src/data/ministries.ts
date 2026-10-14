import type { LucideIcon } from "lucide-react";
import { Baby, Flower2, Hammer, Flame, Compass, Music, HeartPulse, HandHeart } from "lucide-react";

// A class or level inside a group, e.g. "Friend" in Pathfinders or
// "Busy Bee" in Adventurers.
export type MinistryClass = {
  name: string;
  ageRange?: string; // e.g. "Age 10"
  description?: string;
  // Optional picture for the class (e.g. an investiture photo)
  image?: string;
  // Optional emblem / badge. Without one, a round badge with the class
  // initials is shown instead.
  emblem?: string;
};

// A section inside a ministry, e.g. "Pathfinders" inside Clubs, or
// "Alive in Jesus" inside Children's Ministry. Groups can have classes.
export type MinistryGroup = {
  slug: string;
  name: string;
  summary: string;
  description?: string;
  ageRange?: string;
  meetingSchedule?: string; // falls back to the ministry's schedule
  leaders?: string[]; // falls back to the ministry's leaders
  image?: string;
  emblem?: string;
  classesLabel?: string; // heading for the classes, default "Classes"
  classes?: MinistryClass[];
};

export type Ministry = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  meetingSchedule: string;
  leaders: string[];
  contact: string;
  icon: LucideIcon;
  // Short tag shown above the summary, e.g. "Ages 0–12"
  audience: string;
  // Optional photo, e.g. "/ministries/children.jpg" (drop files in /public/ministries).
  // Without one, the card falls back to the church photo under a maroon wash,
  // with the ministry's icon on top.
  image?: string;
  emblem?: string;
  // Optional sections (clubs, programmes, departments...) with their own
  // pages, pictures, emblems and classes. Any ministry can use this.
  groupsLabel?: string; // heading for the groups, default "Sections"
  groups?: MinistryGroup[];
};

export const ministries: Ministry[] = [
  {
    slug: "children",
    audience: "Ages 0–12",
    name: "Children's Ministry",
    summary: "Sabbath School and discipleship for ages 0–12.",
    description:
      "We nurture the youngest members of our church family through age-appropriate Sabbath School classes, holiday programmes, and Vacation Bible School. Every child is known by name and prayed for by name.",
    meetingSchedule: "Sabbaths, 9:00 AM — Sabbath School hour",
    leaders: ["Sis. Grace Wanjiru", "Bro. Kevin Otieno"],
    contact: "children@sdackc.org",
    icon: Baby,
    groupsLabel: "Programmes",
    groups: [
      {
        slug: "kid",
        name: "Kids in Discipleship (KID)",
        summary: "A discipleship programme that helps children grow in their walk with Jesus.",
        // emblem: "/ministries/children/kid/emblem.png",
        // image: "/ministries/children/kid/cover.jpg",
      },
      {
        slug: "alive-in-jesus",
        name: "Alive in Jesus",
        summary: "Sabbath School for children, grouped by age so every child learns at their level.",
        classesLabel: "Levels",
        // emblem: "/ministries/children/alive-in-jesus/emblem.png",
        classes: [
          { name: "Beginner", ageRange: "Ages 0–3" },
          { name: "Kindergarten", ageRange: "Ages 4–6" },
          { name: "Primary", ageRange: "Ages 7–9" },
          { name: "Junior", ageRange: "Ages 10–12" },
          { name: "Earliteen", ageRange: "Ages 13–15" },
        ],
      },
    ],
  },
  {
    slug: "women",
    audience: "Women",
    name: "Women's Ministry",
    summary: "Fellowship, mentorship, and outreach for the women of KCC.",
    description:
      "A space for women to grow spiritually, support one another through life's seasons, and serve the wider community — from prayer breakfasts to outreach visits to families in need.",
    meetingSchedule: "Second Saturday of the month, 3:00 PM",
    leaders: ["Sis. Mercy Achieng"],
    contact: "women@sdackc.org",
    icon: Flower2,
  },
  {
    slug: "men",
    audience: "Men",
    name: "Men's Ministry",
    summary: "Discipleship, accountability, and service for the men of KCC.",
    description:
      "Building men who lead their homes and their community with integrity — through Bible study, mentorship of younger men, and hands-on service projects.",
    meetingSchedule: "Third Saturday of the month, 3:00 PM",
    leaders: ["Bro. Daniel Kimani"],
    contact: "men@sdackc.org",
    icon: Hammer,
  },
  {
    slug: "young-adults",
    audience: "Ages 18–35",
    name: "Young Adults",
    summary: "Ages 18–35 — Bible study, fellowship, and life together.",
    description:
      "A community for young adults navigating career, relationships, and faith together — weekly Bible study, monthly fellowship events, and a strong presence in Ibisil mission outreach.",
    meetingSchedule: "Fridays, 6:30 PM — Vespers & Bible study",
    leaders: ["Bro. Allan Mutiso", "Sis. Faith Njoroge"],
    contact: "youngadults@sdackc.org",
    icon: Flame,
  },
  {
    slug: "clubs",
    audience: "Ages 4–15 & leaders",
    name: "Clubs",
    summary: "Adventurers, Pathfinders and Master Guides — character, service, and outdoor adventure.",
    description:
      "Uniformed youth clubs building character, practical skills, and a love for service and the outdoors, grounded in Scripture — and the Master Guide programme that trains the adults who lead them.",
    meetingSchedule: "Sabbaths, 4:00 PM",
    leaders: ["Bro. Peter Ndegwa"],
    contact: "pathfinders@sdackc.org",
    icon: Compass,
    groupsLabel: "Our clubs",
    groups: [
      {
        slug: "adventurers",
        name: "Adventurers",
        ageRange: "Ages 4–9",
        summary: "Play-based learning, nature, and service for our youngest club members.",
        // emblem: "/ministries/clubs/adventurers/emblem.png",
        // image: "/ministries/clubs/adventurers/cover.jpg",
        classesLabel: "Classes",
        classes: [
          { name: "Little Lamb", ageRange: "Age 4" },
          { name: "Eager Beaver", ageRange: "Age 5" },
          { name: "Busy Bee", ageRange: "Age 6" },
          { name: "Sunbeam", ageRange: "Age 7" },
          { name: "Builder", ageRange: "Age 8" },
          { name: "Helping Hand", ageRange: "Age 9" },
        ],
      },
      {
        slug: "pathfinders",
        name: "Pathfinders",
        ageRange: "Ages 10–15",
        summary: "Character, skills, outdoor adventure, and service for young people.",
        // emblem: "/ministries/clubs/pathfinders/emblem.png",
        // image: "/ministries/clubs/pathfinders/cover.jpg",
        classesLabel: "Classes",
        classes: [
          { name: "Friend", ageRange: "Age 10" },
          { name: "Companion", ageRange: "Age 11" },
          { name: "Explorer", ageRange: "Age 12" },
          { name: "Ranger", ageRange: "Age 13" },
          { name: "Voyager", ageRange: "Age 14" },
          { name: "Guide", ageRange: "Age 15" },
        ],
      },
      {
        slug: "master-guides",
        name: "Master Guides",
        ageRange: "Adult leaders",
        summary: "Training and certification for the adults who lead Adventurer and Pathfinder clubs.",
        // emblem: "/ministries/clubs/master-guides/emblem.png",
        // image: "/ministries/clubs/master-guides/cover.jpg",
      },
    ],
  },
  {
    slug: "music",
    audience: "All ages",
    name: "Music & Praise Team",
    summary: "Leading the congregation in worship through song.",
    description:
      "Choirs, the praise team, and instrumentalists who prepare and lead worship music for Sabbath services and special programmes.",
    meetingSchedule: "Thursdays, 6:30 PM — rehearsal",
    leaders: ["Sis. Joan Mumbi"],
    contact: "music@sdackc.org",
    icon: Music,
    groupsLabel: "Our teams",
    groups: [
      { slug: "praise-team", name: "Praise Team", summary: "Leads the congregation in praise and worship each Sabbath." },
      { slug: "church-choir", name: "Church Choir", summary: "Choral music for Sabbath services and special programmes." },
      { slug: "instrumentalists", name: "Instrumentalists", summary: "Musicians who accompany worship and special music." },
    ],
  },
  {
    slug: "health",
    audience: "Community",
    name: "Health Ministries",
    summary: "Whole-person wellness for the church and community.",
    description:
      "Free health screenings, wellness talks, and practical guidance on the eight laws of health — for members and the surrounding community alike.",
    meetingSchedule: "Quarterly health outreach — see Events",
    leaders: ["Dr. Susan Wambui"],
    contact: "health@sdackc.org",
    icon: HeartPulse,
  },
  {
    slug: "community-services",
    audience: "Outreach",
    name: "Community Services",
    summary: "Practical care for families in need, in and beyond KCC.",
    description:
      "Food, clothing, and material support for families going through hardship, plus the church's outward-facing outreach efforts like the Ibisil mission campaign.",
    meetingSchedule: "By request — coordinated as needs arise",
    leaders: ["Sis. Ruth Kamau"],
    contact: "community@sdackc.org",
    icon: HandHeart,
  },
];
