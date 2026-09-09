import type { Metadata } from "next";
import Link from "next/link";
import { ExecutiveDevelopmentHeroSequence } from "@/components/executive-development-hero-sequence";
import { FlagshipOfferCards } from "@/components/flagship-offer-cards";
import { LeadershipTeamOutcomes } from "@/components/leadership-team-outcomes";
import { PillarCta } from "@/components/pillar-cta";
import { RoughAnnotate } from "@/components/rough-annotate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopBar } from "@/components/top-bar";
import {
  executiveDevelopmentBehaviours,
  executiveDevelopmentMeta,
  executiveDevelopmentOutcomes,
  executiveDevelopmentPortfolio,
  executiveDevelopmentProblem,
  leaderAsCoach,
  leadershipCatalyst,
} from "@/lib/executive-development";

export const metadata: Metadata = {
  title: "Executive Development | Obi James Consultancy",
  description:
    "Developing leaders who create capability rather than dependency — from personal contribution to enterprise leadership and organisational stewardship.",
};

export default function ExecutiveDevelopmentPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="overflow-x-clip bg-[var(--obi-bg)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 pt-12 pb-10 sm:gap-10 sm:pt-16 sm:pb-12 md:px-10 md:pt-24 md:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 lg:px-14 lg:pt-28">
            <div>
              <h1 className="text-3xl font-bold text-[var(--obi-navy)] sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.05]">
                {executiveDevelopmentMeta.title}
              </h1>
              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                <Link
                  href="#portfolio"
                  className="inline-flex bg-[var(--obi-navy)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)] sm:px-6"
                >
                  Explore the portfolio
                </Link>
                <Link
                  href="mailto:info@obijames.com"
                  className="inline-flex border border-[var(--obi-navy)]/25 px-5 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)] sm:px-6"
                >
                  Talk to us
                </Link>
              </div>
            </div>
            <div className="space-y-4 text-base leading-7 text-[var(--obi-navy)]/80 sm:space-y-5 sm:leading-8 md:text-lg md:leading-8 lg:pt-2">
              <p className="text-lg text-[var(--obi-muted)] sm:text-xl md:text-2xl">
                Developing leaders who{" "}
                <RoughAnnotate
                  type="underline"
                  color="var(--obi-gold)"
                  strokeWidth={1.5}
                  iterations={2}
                  padding={1}
                >
                  create capability
                </RoughAnnotate>{" "}
                rather than dependency.
              </p>
              <p>{executiveDevelopmentMeta.description}</p>
            </div>
          </div>
        </section>

        <ExecutiveDevelopmentHeroSequence
          question={executiveDevelopmentMeta.question}
          behaviours={executiveDevelopmentBehaviours}
        />

        <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg-elevated)] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 text-center md:px-10 lg:px-14">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-[var(--obi-navy)] sm:text-4xl lg:text-5xl lg:leading-tight">
                {executiveDevelopmentProblem.response}
              </h2>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="mailto:info@obijames.com"
                  className="inline-flex bg-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
                >
                  Start a conversation
                </Link>
                <Link
                  href="#portfolio"
                  className="inline-flex border border-[var(--obi-navy)]/25 px-6 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]"
                >
                  Explore the portfolio
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 grid w-full grid-cols-2 border-t-2 border-l-2 border-[var(--obi-navy)]/25 md:mt-28 lg:grid-cols-3">
            <div className="flex flex-col justify-center border-r-2 border-b-2 border-[var(--obi-navy)]/25 bg-[var(--obi-navy)] px-4 py-6 sm:px-5 sm:py-7 md:px-7 md:py-8">
              <p className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                Facing any of these?
              </p>
            </div>

            {executiveDevelopmentProblem.challenges.map((item) => (
              <div
                key={item}
                className="border-r-2 border-b-2 border-[var(--obi-navy)]/25 px-4 py-6 sm:px-5 sm:py-7 md:px-7 md:py-8"
              >
                <p className="text-sm leading-6 text-[var(--obi-navy)]/85 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                  {item}
                </p>
              </div>
            ))}

            <div className="flex flex-col items-start justify-between gap-6 border-r-2 border-b-2 border-[var(--obi-navy)]/25 bg-[var(--obi-navy)] px-4 py-6 sm:gap-8 sm:px-5 sm:py-7 md:px-7 md:py-8">
              <p className="max-w-md text-lg font-bold text-white sm:text-xl md:text-2xl">
                Ready to change the pattern?
              </p>
              <Link
                href="mailto:info@obijames.com"
                className="inline-flex bg-white px-5 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:bg-white/90 sm:px-6"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>

        <section
          id="portfolio"
          className="scroll-mt-28 border-t border-[var(--obi-border)] bg-[var(--obi-bg)] py-20 md:py-28"
        >
          <div className="mx-auto w-[80%] px-6 text-center md:px-10 lg:px-14">
            <h2 className="text-3xl font-bold text-[var(--obi-navy)] sm:text-4xl lg:text-5xl">
              {executiveDevelopmentPortfolio.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--obi-muted)] md:text-lg md:leading-8">
              {executiveDevelopmentPortfolio.intro}
            </p>
          </div>

          <FlagshipOfferCards
            offers={[
              {
                title: leadershipCatalyst.title,
                tagline: leadershipCatalyst.tagline,
                href: "mailto:info@obijames.com?subject=Leadership%20Catalyst",
                tone: "navy",
              },
              {
                title: leaderAsCoach.title,
                tagline:
                  "Equip leaders to grow capability, ownership and accountability through everyday conversations.",
                href: "mailto:info@obijames.com?subject=Leader%20as%20Coach",
                tone: "accent",
              },
            ]}
          />
        </section>

        <LeadershipTeamOutcomes
          title={executiveDevelopmentOutcomes.title}
          subtitle={executiveDevelopmentOutcomes.intro}
          items={executiveDevelopmentOutcomes.items}
        />

        <PillarCta
          title="Not sure where your leaders are stuck?"
          body="Start with a diagnostic — we'll help you see what's holding capability back, and what to do next."
          primaryHref="mailto:info@obijames.com?subject=Leadership%20diagnostic"
          imageAlt="Executive coach inviting a conversation about leadership development"
          tone="navy"
        />
      </main>
      <SiteFooter />
    </>
  );
}
