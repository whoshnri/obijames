import { getVideoThumbnail } from "@/lib/videos";
import type { PublicVideo } from "@/lib/content";

export function VideoPlayer({ video }: { video: PublicVideo }) {
  if (video.youtubeId) {
    return (
      <iframe
        title={video.title}
        src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (video.videoUrl) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        controls
        preload="metadata"
        poster={getVideoThumbnail(video) ?? undefined}
        src={video.videoUrl}
      >
        <track kind="captions" />
      </video>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--obi-navy)] text-sm font-semibold tracking-[0.14em] text-white/60 uppercase">
      Video unavailable
    </div>
  );
}
