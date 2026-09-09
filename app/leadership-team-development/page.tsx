import type { Metadata } from "next";
import { FlagshipOfferCards } from "@/components/flagship-offer-cards";
import { LeadershipTeamHeroSequence } from "@/components/leadership-team-hero-sequence";
import { LeadershipTeamOutcomes } from "@/components/leadership-team-outcomes";
import { PillarCta } from "@/components/pillar-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopBar } from "@/components/top-bar";
import {
  leadershipTeamMeta,
  leadershipTeamOutcomes,
  leadershipTeamPortfolio,
  leadershipTeamProblem,
} from "@/lib/leadership-team-development";

export const metadata: Metadata = {
  title: "Leadership Team Development | Obi James Consultancy",
  description:
    "Transform groups of senior leaders into teams that operate as one — collective accountability and organisational leadership.",
};

export default function LeadershipTeamDevelopmentPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <LeadershipTeamHeroSequence
          title={leadershipTeamMeta.title}
          summary={leadershipTeamMeta.summary}
          question={leadershipTeamMeta.question}
          problemHeadline={leadershipTeamProblem.headline}
          problemBody={leadershipTeamProblem.body}
          problemClose={leadershipTeamProblem.close}
          pressures={leadershipTeamProblem.pressures}
        />

        <section
          id="work"
          className="scroll-mt-28 border-t border-[var(--obi-border)] bg-[var(--obi-bg)] py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="text-3xl font-bold text-[var(--obi-navy)] sm:text-4xl lg:text-5xl">
              {leadershipTeamPortfolio.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--obi-muted)] md:text-lg md:leading-8">
              {leadershipTeamPortfolio.intro}
            </p>
          </div>

          <FlagshipOfferCards
            offers={leadershipTeamPortfolio.flagships}
            seeAllHref="mailto:info@obijames.com?subject=Leadership%20Team%20portfolio"
          />
        </section>

        <LeadershipTeamOutcomes
          title={leadershipTeamOutcomes.title}
          subtitle="Collective leadership — not superficial harmony."
          items={leadershipTeamOutcomes.items}
        />

        <PillarCta
          tone="light"
          title="Is your top team leading the organisation — or just their functions?"
          body="Start with a team diagnostic, or talk through what's blocking collective ownership."
          primaryHref="mailto:info@obijames.com?subject=Executive%20Team%20Diagnostic"
          imageAlt="Coach inviting a conversation about leadership team development"
        />
      </main>
      <SiteFooter />
    </>
  );
}
