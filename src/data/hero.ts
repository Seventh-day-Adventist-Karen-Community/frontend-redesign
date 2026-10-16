// Slides for the homepage hero carousel (see components/HeroCarousel.tsx).
//
// `image` is the background. Slides that share an image keep it on screen;
// the picture only cross-fades when the next slide uses a different one, so
// images change "on occasion" rather than every time. Add more photos to
// /public and point slides at them to rotate more.

export type HeroCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type HeroSlide = {
  id: string;
  title: string[]; // one entry per line
  text: string;
  image: string;
  ctas: HeroCta[];
};

export const heroSlides: HeroSlide[] = [
  {
    id: "series",
    title: ["Find Your People.", "Love Your Neighbor."],
    text: "God created us to need and know each other. But what does that look like? How do you build lasting friendships that make life better? Let’s find out in our new series, Find Your People, Love Your Neighbor.",
    image: "/hero-landing.png",
    ctas: [
      { label: "Watch Live", href: "/live", variant: "primary" },
      { label: "This Week's Bulletin", href: "/bulletin", variant: "secondary" },
    ],
  },
  {
    id: "giving",
    title: ["Give with a", "cheerful heart."],
    text: "Support the church’s tithes, offerings and development in a few taps, right from your phone.",
    image: "/hero-church.png",
    ctas: [{ label: "Give Now", href: "/giving", variant: "primary" }],
  },
  {
    id: "belong",
    title: ["There’s a place", "for you here."],
    text: "From children’s classes and Pathfinders to women’s, men’s and young adults’ ministries, and the music team: find where you belong and grow with us.",
    image: "/hero-church.png",
    ctas: [
      { label: "Explore ministries", href: "/ministries", variant: "primary" },
      { label: "Upcoming events", href: "/events", variant: "secondary" },
    ],
  },
  {
    id: "visit",
    title: ["Join us", "this Sabbath."],
    text: "Sabbath School at 9:00 AM and Divine Service at 11:00 AM. Come as you are, and bring a friend.",
    image: "/hero-landing.png",
    ctas: [
      { label: "Plan your visit", href: "/about", variant: "primary" },
      { label: "Weekly programme", href: "/bulletin", variant: "secondary" },
    ],
  },
];
