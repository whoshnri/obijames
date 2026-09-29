"use client";

import Image from "next/image";
import {
  formatVideoDate,
  formatVideoDuration,
  getVideoThumbnail,
} from "@/lib/videos";
import type { PublicVideo } from "@/lib/content";

const sizes = {
  sm: "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw",
  lg: "(max-width: 1024px) 90vw, 45vw",
} as const;

export function VideoCard({
  video,
  size = "sm",
  onSelect,
}: {
  video: PublicVideo;
  size?: "sm" | "lg";
  onSelect: (video: PublicVideo) => void;
}) {
  const thumbnail = getVideoThumbnail(video);
  const duration = formatVideoDuration(video.durationSeconds);
  const date = formatVideoDate(video.publishedAt);

  return (
    <button
      type="button"
      onClick={() => onSelect(video)}
      aria-label={`Play ${video.title}`}
      className="group flex h-full w-full cursor-pointer flex-col text-left"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--obi-navy)]">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt=""
            fill
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            sizes={sizes[size]}
            unoptimized={thumbnail.startsWith("http")}
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--obi-navy)]" />
        )}

        <div
          aria-hidden
          className="absolute inset-0 bg-[var(--obi-navy)]/0 transition duration-500 group-hover:bg-[var(--obi-navy)]/35"
        />

        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[var(--obi-navy)] shadow-sm transition duration-300 ease-out group-hover:scale-105 group-hover:bg-white">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M6.5 4.2v9.6a.6.6 0 0 0 .92.51l7.4-4.8a.6.6 0 0 0 0-1.02l-7.4-4.8a.6.6 0 0 0-.92.51Z" />
            </svg>
          </span>
        </span>

        {duration ? (
          <span className="absolute right-3 bottom-3 inline-flex bg-[var(--obi-navy)]/85 px-2 py-1 text-xs font-semibold text-white">
            {duration}
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h3
          className={[
            "font-bold tracking-tight text-[var(--obi-navy)] transition duration-300 group-hover:text-[var(--obi-navy-light)]",
            size === "lg"
              ? "text-xl leading-snug md:text-[1.35rem]"
              : "text-lg leading-snug",
          ].join(" ")}
        >
          {video.title}
        </h3>
        {video.description && size === "lg" ? (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--obi-muted)]">
            {video.description}
          </p>
        ) : null}
        {date ? (
          <p className="mt-auto pt-4 text-xs text-[var(--obi-muted)]">{date}</p>
        ) : null}
      </div>
    </button>
  );
}
