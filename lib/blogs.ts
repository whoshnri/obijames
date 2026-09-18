export type { BlogPostCard as BlogPost } from "@/lib/content";
export { toBlogCard } from "@/lib/content";

/** Static fallback used when the public API is unreachable or empty. */
export const recentBlogs = [
  {
    title: "When and How to Share Tough People Decisions Before the Holidays",
    slug: "when-and-how-to-share-tough-people-decisions-before-the-holidays",
    date: "2025-12-22",
    category: "Leadership",
    author: "Obi James",
    image:
      "https://obijames.com/wp-content/uploads/2025/12/When-and-How-to-Share-Tough-People-Decisions-Before-the-Holidays.jpg",
    href: "/blogs",
  },
  {
    title: "Every Resignation Is a Love Story Ending",
    slug: "every-resignation-is-a-love-story-ending",
    date: "2025-10-21",
    category: "Workplace Culture",
    author: "Obi James",
    image:
      "https://obijames.com/wp-content/uploads/2025/12/Every-Resignation-Is-a-Love-Story-Ending.jpg",
    href: "/blogs",
  },
  {
    title:
      "Black Representation at the World Cities Culture Forum 2025 - Amsterdam",
    slug: "black-representation-at-the-world-cities-culture-forum-2025-amsterdam",
    date: "2025-10-19",
    category: "Culture & Leadership",
    author: "Obi James",
    image:
      "https://obijames.com/wp-content/uploads/2025/12/Black-Representation-at-the-World-Cities-Culture-Forum-2025-%E2%80%93-Amsterdam.jpg",
    href: "/blogs",
  },
  {
    title: "When History Walks Into the Workplace",
    slug: "when-history-walks-into-the-workplace",
    date: "2025-09-30",
    category: "Leadership",
    author: "Obi James",
    image:
      "https://obijames.com/wp-content/uploads/2025/12/When-History-Walks-Into-the-Workplace.jpg",
    href: "/blogs",
  },
] as const;
