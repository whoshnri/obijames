import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookPurchaseButtons } from "@/components/book-purchase-buttons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopBar } from "@/components/top-bar";
import {
  bookAudience,
  bookInterview,
  bookIntro,
  bookLinks,
  bookMeta,
  bookReviews,
} from "@/lib/book";

export const metadata: Metadata = {
  title: "Let Go Leadership - The Book | Obi James Consultancy",
  description:
    "How inclusive leaders share power to drive high performance. Buy Let Go Leadership, download the audiobook companion PDF, and read praise from global leaders.",
};

function YoutubeEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[var(--obi-navy)]/5">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
      />
    </div>
  );
}

export default function TheBookPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="bg-[var(--obi-bg)] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <Image
                src={bookMeta.coverImage}
                alt={bookMeta.coverAlt}
                width={720}
                height={1000}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 80vw, 420px"
                priority
              />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.14em] text-[var(--obi-gold)] uppercase">
                The Book
              </p>
              <h1 className="mt-4 text-4xl font-bold text-[var(--obi-navy)] sm:text-5xl lg:text-6xl">
                {bookMeta.title}
              </h1>
              <p className="mt-4 text-xl text-[var(--obi-muted)]">
                {bookMeta.subtitle}
              </p>
              <BookPurchaseButtons className="mt-10" />
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg-elevated)] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-[var(--obi-navy)] sm:text-4xl">
                About the book
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--obi-navy)]/80">
                {bookIntro}
              </p>
              <BookPurchaseButtons className="mt-10" />
            </div>
            <YoutubeEmbed
              id={bookLinks.trailerYoutubeId}
              title="Let Go Leadership book trailer"
            />
          </div>
        </section>

        <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-[var(--obi-navy)] sm:text-4xl">
              This book is for you if you:
            </h2>
            <ul className="mt-10 space-y-4">
              {bookAudience.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 text-lg leading-8 text-[var(--obi-navy)]/80"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--obi-gold)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Link
                href={bookLinks.freeChapter}
                className="inline-flex bg-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
              >
                Sign up for a free download of the first chapter
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg-elevated)] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-[var(--obi-navy)] sm:text-4xl">
                {bookInterview.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--obi-navy)]/80">
                {bookInterview.body}
              </p>
              <a
                href={bookLinks.amazonUk}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex border border-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:bg-[var(--obi-navy)] hover:text-white"
              >
                {bookInterview.ctaLabel}
              </a>
            </div>
            <YoutubeEmbed
              id={bookLinks.interviewYoutubeId}
              title={bookInterview.title}
            />
          </div>
        </section>

        <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg)] ">
          <div className="mx-auto max-w-9xl">
            <div className="grid grid-cols-1 border-l border-t border-[var(--obi-border)] md:grid-cols-6 lg:grid-cols-12">
              {bookReviews.map((review, index) => {
                const spans = [
                  "md:col-span-4 lg:col-span-7",
                  "md:col-span-2 lg:col-span-5",
                  "md:col-span-2 lg:col-span-4",
                  "md:col-span-2 lg:col-span-4",
                  "md:col-span-2 lg:col-span-4",
                  "md:col-span-4 lg:col-span-8",
                  "md:col-span-2 lg:col-span-4",
                  "md:col-span-6 lg:col-span-6",
                ];
                const featured = index === 0 || index === 5;

                return (
                  <figure
                    key={review.attribution}
                    className={`flex flex-col justify-between border-r border-b border-[var(--obi-border)] bg-[var(--obi-bg)] p-6 md:p-8 ${spans[index]}`}
                  >
                    <blockquote
                      className={`whitespace-pre-line font-display leading-relaxed text-[var(--obi-navy)]/85 ${
                        featured
                          ? "text-sm md:text-base md:leading-8"
                          : "text-sm md:text-md md:leading-8"
                      }`}
                    >
                      “{review.quote}”
                    </blockquote>
                    <figcaption className="mt-6 text-xs font-semibold text-[var(--obi-muted)] md:text-sm">
                      {review.attribution}
                    </figcaption>
                  </figure>
                );
              })}

              <div className="relative hidden min-h-72 border-r border-b border-[var(--obi-border)] bg-[var(--obi-bg)] md:col-span-6 md:block lg:col-span-6">
                <Image
                  src={bookMeta.formatsBadgeImage}
                  alt={bookMeta.formatsBadgeAlt}
                  fill
                  className="object-contain pb-4"
                  sizes="(max-width: 1024px) 50vw, 40vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
