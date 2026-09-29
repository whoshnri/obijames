import type { PublicVideo } from "@/lib/content";

const GENERIC_CATEGORIES = new Set(["video", "videos", "uncategorized", ""]);

export function isGenericVideoCategory(category?: string | null) {
  return GENERIC_CATEGORIES.has((category ?? "").trim().toLowerCase());
}

export function getVideoThumbnail(video: PublicVideo) {
  if (video.thumbnailUrl) return video.thumbnailUrl;
  if (video.youtubeId) {
    return `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
  }
  return null;
}

export function formatVideoDuration(seconds?: number | null) {
  if (!seconds || seconds <= 0) return null;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const pad = (value: number) => String(value).padStart(2, "0");
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(secs)}`
    : `${minutes}:${pad(secs)}`;
}

export function formatVideoDate(value?: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function collectVideoCategories(videos: PublicVideo[]) {
  const categories = new Set<string>();
  for (const video of videos) {
    if (!isGenericVideoCategory(video.category)) {
      categories.add(video.category!.trim());
    }
  }
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}
