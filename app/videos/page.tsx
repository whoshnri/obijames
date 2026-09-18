import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopBar } from "@/components/top-bar";
import { fetchPublishedVideos, formatContentDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Videos | Obi James Consultancy",
  description:
    "Talks, workshops and conversations on leadership, teams and organisational capability.",
};

export const revalidate = 60;

function VideoEmbed({
  youtubeId,
  videoUrl,
  title,
}: {
  youtubeId: string | null;
  videoUrl: string | null;
  title: string;
}) {
  if (youtubeId) {
    return (
      <iframe
        title={title}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (videoUrl) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        controls
        preload="metadata"
        src={videoUrl}
      >
        <track kind="captions" />
      </video>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--obi-navy)] text-white/60">
      Video unavailable
    </div>
  );
}

export default async function VideosPage() {
  const videos = await fetchPublishedVideos();

  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="border-b border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-16 md:px-10 md:py-24 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-5xl lg:text-6xl">
              Videos
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--obi-muted)] md:text-lg md:leading-8">
              Conversations and sessions on letting go, building capability, and
              leading together.
            </p>
          </div>
        </section>

        <section className="bg-[var(--obi-bg-elevated)] px-6 py-16 md:px-10 md:py-20 lg:px-14">
          <div className="mx-auto max-w-7xl">
            {videos.length === 0 ? (
              <div className="border border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-16 text-center">
                <p className="text-lg font-semibold text-[var(--obi-navy)]">
                  Videos coming soon
                </p>
                <p className="mt-3 text-[var(--obi-muted)]">
                  In the meantime, explore the book or start a diagnostic conversation.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/the-book"
                    className="inline-flex bg-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
                  >
                    Explore the book
                  </Link>
                  <Link
                    href="mailto:info@obijames.com"
                    className="inline-flex border border-[var(--obi-navy)]/25 px-6 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]"
                  >
                    Talk to us
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-10 lg:grid-cols-2">
                {videos.map((video) => (
                  <article key={video.id} className="flex flex-col">
                    <div className="relative aspect-video overflow-hidden bg-[var(--obi-navy)]">
                      <VideoEmbed
                        youtubeId={video.youtubeId}
                        videoUrl={video.videoUrl}
                        title={video.title}
                      />
                    </div>
                    <div className="mt-5">
                      {video.category ? (
                        <p className="text-xs font-semibold tracking-wide text-[var(--obi-muted)] uppercase">
                          {video.category}
                        </p>
                      ) : null}
                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--obi-navy)]">
                        {video.title}
                      </h2>
                      {video.description ? (
                        <p className="mt-3 text-base leading-7 text-[var(--obi-muted)]">
                          {video.description}
                        </p>
                      ) : null}
                      {video.publishedAt ? (
                        <p className="mt-4 text-xs text-[var(--obi-muted)]">
                          {formatContentDate(video.publishedAt)}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
