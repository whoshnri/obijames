import type { Metadata } from "next";
import { FlagshipOfferCards } from "@/components/flagship-offer-cards";
import { OrganisationalCapabilityFractures } from "@/components/organisational-capability-fractures";
import { OrganisationalCapabilityHero } from "@/components/organisational-capability-hero";
import { OrganisationalCapabilityLenses } from "@/components/organisational-capability-lenses";
import { LeadershipTeamOutcomes } from "@/components/leadership-team-outcomes";
import { PillarCta } from "@/components/pillar-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopBar } from "@/components/top-bar";
import {
  organisationalCapabilityLenses,
  organisationalCapabilityMeta,
  organisationalCapabilityOutcomes,
  organisationalCapabilityPortfolio,
  organisationalCapabilityProblem,
} from "@/lib/organisational-capability";

export const metadata: Metadata = {
  title: "Organisational Capability | Obi James Consultancy",
  description:
    "Build the structures, governance and leadership systems that make shared leadership possible and sustainable.",
};

export default function OrganisationalCapabilityPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <OrganisationalCapabilityHero
          title={organisationalCapabilityMeta.title}
          summary={organisationalCapabilityMeta.summary}
          question={organisationalCapabilityMeta.question}
        />

        <OrganisationalCapabilityFractures
          title={organisationalCapabilityProblem.title}
          intro={organisationalCapabilityProblem.intro}
          challenges={organisationalCapabilityProblem.challenges}
        />

        <section
          id="work"
          className="scroll-mt-28 border-t border-[var(--obi-border)] bg-[var(--obi-bg)] py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-4xl lg:text-5xl">
              {organisationalCapabilityPortfolio.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--obi-muted)] md:text-lg md:leading-8">
              {organisationalCapabilityPortfolio.intro}
            </p>
          </div>

          <FlagshipOfferCards
            offers={organisationalCapabilityPortfolio.flagships}
            seeAllHref="mailto:info@obijames.com?subject=Organisational%20Capability%20portfolio"
            seeAllLabel="Talk through the full portfolio"
          />
        </section>

        <OrganisationalCapabilityLenses
          title={organisationalCapabilityLenses.title}
          intro={organisationalCapabilityLenses.intro}
          items={organisationalCapabilityLenses.items}
        />

        <LeadershipTeamOutcomes
          title={organisationalCapabilityOutcomes.title}
          subtitle="Not better programmes - clearer conditions for shared leadership."
          items={organisationalCapabilityOutcomes.items}
        />

        <PillarCta
          tone="navy"
          title="Ready for a whole-system read?"
          body="Start with the Capability Diagnostic - twelve lenses, one clear view of what needs to change next."
          primaryHref="mailto:info@obijames.com?subject=Organisational%20Capability%20Diagnostic"
          primaryLabel="Start a diagnostic"
          imageAlt="Coach inviting a conversation about organisational capability"
        />
      </main>
      <SiteFooter />
    </>
  );
}
