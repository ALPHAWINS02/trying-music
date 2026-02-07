export interface DayConfig {
  id: number;
  name: string;
  date: number; // day of month (Feb)
  route: string;
  emoji: string;
  primaryColor: string;
  secondaryColor: string;
  bgGradientFrom: string;
  bgGradientTo: string;
  quote: string;
  subQuote: string;
  music: string; // path to MP3 file in public/music/
}

export const VALENTINE_DAYS: DayConfig[] = [
  {
    id: 1,
    name: "Rose Day",
    date: 7,
    route: "/rose-day",
    emoji: "🌹",
    primaryColor: "#C41E3A",
    secondaryColor: "#FF69B4",
    bgGradientFrom: "#ffe0e6",
    bgGradientTo: "#ffb3c1",
    quote: "Every rose whispers your name, every petal holds a piece of my heart.",
    subQuote: "A single rose can be my garden... a single friend, my world.",
    music: "/music/rose-day.mp3",
  },
  {
    id: 2,
    name: "Propose Day",
    date: 8,
    route: "/propose-day",
    emoji: "💍",
    primaryColor: "#DAA520",
    secondaryColor: "#FF69B4",
    bgGradientFrom: "#fff8e7",
    bgGradientTo: "#ffe4e1",
    quote: "In a world full of temporary things, you are a perpetual feeling.",
    subQuote: "I didn't choose you. My heart did.",
    music: "/music/propose-day.mp3",
  },
  {
    id: 3,
    name: "Chocolate Day",
    date: 9,
    route: "/chocolate-day",
    emoji: "🍫",
    primaryColor: "#7B3F00",
    secondaryColor: "#D2691E",
    bgGradientFrom: "#f5e6d3",
    bgGradientTo: "#e8c9a0",
    quote: "Life is like a box of chocolates, but you are the sweetest piece.",
    subQuote: "You make everything sweeter just by being you.",
    music: "/music/chocolate-day.mp3",
  },
  {
    id: 4,
    name: "Teddy Day",
    date: 10,
    route: "/teddy-day",
    emoji: "🧸",
    primaryColor: "#DEB887",
    secondaryColor: "#F5DEB3",
    bgGradientFrom: "#fef3e2",
    bgGradientTo: "#fde2c8",
    quote: "When I can't be there, let this teddy hold you tight and remind you of my love.",
    subQuote: "Soft, warm, and always there — just like my love for you.",
    music: "/music/teddy-day.mp3",
  },
  {
    id: 5,
    name: "Promise Day",
    date: 11,
    route: "/promise-day",
    emoji: "🤙",
    primaryColor: "#9370DB",
    secondaryColor: "#E6E6FA",
    bgGradientFrom: "#f0e6ff",
    bgGradientTo: "#e6e6fa",
    quote: "I promise to be your today, your tomorrow, and your forever.",
    subQuote: "Some promises are meant to last a lifetime. Ours is one of them.",
    music: "/music/promise-day.mp3",
  },
  {
    id: 6,
    name: "Hug Day",
    date: 12,
    route: "/hug-day",
    emoji: "🤗",
    primaryColor: "#FF7F50",
    secondaryColor: "#FFA07A",
    bgGradientFrom: "#fff0e8",
    bgGradientTo: "#ffe0d0",
    quote: "A hug is a silent way of saying: you mean the world to me.",
    subQuote: "In your arms, I found my home.",
    music: "/music/hug-day.mp3",
  },
  {
    id: 7,
    name: "Kiss Day",
    date: 13,
    route: "/kiss-day",
    emoji: "💋",
    primaryColor: "#FF1493",
    secondaryColor: "#FF69B4",
    bgGradientFrom: "#ffe0f0",
    bgGradientTo: "#ffb6d5",
    quote: "A kiss is a secret told to the mouth instead of the ear.",
    subQuote: "Every kiss from you feels like the first one.",
    music: "/music/kiss-day.mp3",
  },
  {
    id: 8,
    name: "Valentine's Day",
    date: 14,
    route: "/valentines-day",
    emoji: "💝",
    primaryColor: "#E31B23",
    secondaryColor: "#FFD700",
    bgGradientFrom: "#ffe0e0",
    bgGradientTo: "#ffb3b3",
    quote: "You are my today and all of my tomorrows. Happy Valentine's Day!",
    subQuote: "In all the world, there is no heart for me like yours.",
    music: "/music/valentines-day.mp3",
  },
];

/** Welcome page music */
export const WELCOME_MUSIC = "/music/welcome.mp3";

/** Music for all locked/countdown pages */
export const LOCKED_MUSIC = "/music/locked.mp3";

export const MASTER_KEY = "hi";
