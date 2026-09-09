import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type FlagshipOffer = {
  title: string;
  tagline: string;
  href: string;
  tone: "navy" | "accent";
};

type FlagshipOfferCardsProps = {
  offers: readonly FlagshipOffer[];
  seeAllHref?: string;
  seeAllLabel?: string;
};

export function FlagshipOfferCards({
  offers,
  seeAllHref = "mailto:info@obijames.com",
  seeAllLabel = "See all portfolio offers",
}: FlagshipOfferCardsProps) {
  return (
    <>
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 sm:gap-6 md:px-10 lg:mt-20 lg:gap-8 lg:px-14">
        {offers.map((offer) => {
          const navy = offer.tone === "navy";
          return (
            <Link
              key={offer.title}
              href={offer.href}
              aria-label={`${offer.title} — see more`}
              className={[
                "group relative isolate flex min-h-[22rem] overflow-hidden no-underline outline-none sm:min-h-[26rem]",
                "focus-visible:ring-2 focus-visible:ring-[var(--obi-navy)] focus-visible:ring-offset-2",
                navy
                  ? "bg-[var(--obi-navy)] text-white"
                  : "bg-[var(--obi-accent)] text-[var(--obi-gold-soft)]",
              ].join(" ")}
            >
              <div
                aria-hidden
                className={[
                  "pointer-events-none absolute inset-0 transition-opacity duration-500",
                  navy
                    ? "bg-[radial-gradient(ellipse_at_80%_0%,rgba(251,245,223,0.14),transparent_55%)] opacity-80 group-hover:opacity-100"
                    : "bg-[radial-gradient(ellipse_at_15%_100%,rgba(251,245,223,0.12),transparent_50%)] opacity-70 group-hover:opacity-100",
                ].join(" ")}
              />

              <div className="relative h-full w-full px-7 py-9 md:px-10 md:py-12 lg:px-12 lg:py-14">
                {/* Mobile: stacked. Desktop: title locks to the same top on hover */}
                <div className="flex h-full flex-col md:block">
                  <div
                    className={[
                      "max-w-md max-md:mt-0",
                      "md:absolute md:inset-x-10 md:top-[calc(100%-14rem)] lg:inset-x-12",
                      "md:transition-[top] md:duration-700 md:ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "md:group-hover:top-10 md:group-focus-visible:top-10",
                      "lg:group-hover:top-12 lg:group-focus-visible:top-12",
                    ].join(" ")}
                  >
                    <h3 className="max-w-[12ch] text-3xl leading-[1.05] font-bold tracking-tight md:text-4xl lg:text-5xl">
                      {offer.title}
                    </h3>
                    <p
                      className={[
                        "mt-3 max-w-sm text-sm leading-6 md:mt-4 md:text-base md:leading-7",
                        "md:translate-y-2 md:opacity-0 md:transition-[opacity,transform] md:duration-500 md:ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-0",
                        "md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:delay-150 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100 md:group-focus-visible:delay-150",
                        navy
                          ? "text-white/65"
                          : "text-[var(--obi-gold-soft)]/70",
                      ].join(" ")}
                    >
                      {offer.tagline}
                    </p>
                  </div>

                  <div
                    className={[
                      "mt-auto flex justify-end pt-10 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-md:opacity-100 md:mt-0 md:pt-0",
                      "md:absolute md:right-10 md:bottom-10 md:opacity-0 lg:right-12 lg:bottom-12",
                      "md:group-hover:opacity-100 md:group-focus-visible:opacity-100",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "inline-flex h-10 w-10 items-center justify-center md:h-11 md:w-11",
                        navy
                          ? "bg-white text-[var(--obi-navy)]"
                          : "bg-[var(--obi-gold-soft)] text-[var(--obi-accent)]",
                      ].join(" ")}
                    >
                      <ArrowUpRight
                        className="h-4 w-4 md:h-5 md:w-5"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center px-6">
        <Link
          href={seeAllHref}
          className="inline-flex border-2 border-[var(--obi-navy)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--obi-navy)] transition hover:bg-[var(--obi-navy)] hover:text-white"
        >
          {seeAllLabel}
        </Link>
      </div>
    </>
  );
}
