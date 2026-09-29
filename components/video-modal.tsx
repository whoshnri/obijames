"use client";

import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "@/components/video-player";
import { formatVideoDate, formatVideoDuration } from "@/lib/videos";
import type { PublicVideo } from "@/lib/content";

const EXIT_MS = 200;

export function VideoModal({
  video,
  onClose,
}: {
  video: PublicVideo;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);

  const requestClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    window.setTimeout(onClose, EXIT_MS);
  };

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const duration = formatVideoDuration(video.durationSeconds);
  const date = formatVideoDate(video.publishedAt);
  const paragraphs = (video.description ?? "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={requestClose}
      className={[
        "fixed inset-0 z-[100] flex items-stretch justify-center bg-black/95 duration-200 sm:items-center sm:bg-[var(--obi-navy)]/90 sm:px-4 sm:py-10",
        closing
          ? "animate-out fade-out-0 fill-mode-forwards"
          : "animate-in fade-in-0",
      ].join(" ")}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={[
          "relative flex h-full w-full flex-col overflow-hidden bg-black duration-200 sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-4xl sm:overflow-y-auto sm:bg-white",
          closing
            ? "animate-out fade-out-0 zoom-out-95 fill-mode-forwards"
            : "animate-in fade-in-0 zoom-in-95",
        ].join(" ")}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={requestClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-20 inline-flex h-10 w-10 items-center justify-center bg-black/50 text-white transition hover:bg-black/70 sm:bg-white/90 sm:text-[var(--obi-navy)] sm:hover:bg-white"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M4 4l10 10M14 4 4 14"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative flex w-full flex-1 items-center justify-center bg-black sm:aspect-video sm:flex-none">
          <div className="relative aspect-video w-full sm:absolute sm:inset-0">
            <VideoPlayer video={video} />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 pt-14 pb-5 sm:hidden">
          <h2 className="text-base leading-snug font-semibold text-white">
            {video.title}
          </h2>
          {date || duration ? (
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-white/70 uppercase">
              {date ? <span>{date}</span> : null}
              {date && duration ? <span aria-hidden>·</span> : null}
              {duration ? <span>{duration}</span> : null}
            </div>
          ) : null}
        </div>

        <div className="hidden px-6 py-6 sm:block md:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--obi-navy)]">
            {video.title}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wide text-[var(--obi-muted)] uppercase">
            {date ? <span>{date}</span> : null}
            {date && duration ? <span aria-hidden>·</span> : null}
            {duration ? <span>{duration}</span> : null}
          </div>
          {paragraphs.length > 0 ? (
            <div className="mt-5 space-y-4 text-base leading-7 text-[var(--obi-muted)]">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
