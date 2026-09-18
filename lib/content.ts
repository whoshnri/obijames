import { publicApiGet } from "@/lib/public-api";

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  contentHtml: string;
  coverImageUrl: string | null;
  category: string | null;
  authorName: string;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type PublicVideo = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  youtubeId: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  durationSeconds: number | null;
  category: string | null;
  publishedAt: string | null;
};

/** Homepage / listing card shape (keeps blogs-section compatible). */
export type BlogPostCard = {
  title: string;
  slug: string;
  date: string;
  category: string;
  author: string;
  image: string;
  href: string;
  excerpt?: string;
};

export function toBlogCard(post: PublicBlogPost): BlogPostCard {
  return {
    title: post.title,
    slug: post.slug,
    date: (post.publishedAt ?? new Date().toISOString()).slice(0, 10),
    category: post.category ?? "Insights",
    author: post.authorName || "Obi James",
    image: post.coverImageUrl || "/obi1.jpeg",
    href: `/blog/${post.slug}`,
    excerpt: post.excerpt ?? undefined,
  };
}

export async function fetchPublishedBlogs(limit = 50) {
  const posts = await publicApiGet<PublicBlogPost[]>(
    `/public/blogs?limit=${limit}`,
  );
  return posts ?? [];
}

export async function fetchPublishedBlogBySlug(slug: string) {
  return publicApiGet<PublicBlogPost>(
    `/public/blogs/${encodeURIComponent(slug)}`,
  );
}

export async function fetchPublishedVideos(limit = 50) {
  const videos = await publicApiGet<PublicVideo[]>(
    `/public/videos?limit=${limit}`,
  );
  return videos ?? [];
}

export function formatContentDate(value: string | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
