import Link from "next/link";
import { VennDiagram } from "./venn-diagram";

const pillars = [
  {
    number: "01",
    title: "Executive Development",
    question:
      "Who must this leader become for the organisation to succeed at its next level?",
    summary:
      "For boards and HR leaders worried about a specific leader or pipeline not performing at the next level.",
    href: "/executive-development",
    cta: "Explore Executive Development",
  },
  {
    number: "02",
    title: "Leadership Team Development",
    question:
      "What must become possible between these leaders for the organisation to perform?",
    summary:
      "For CEOs and chairs with strong individuals who still are not functioning as one team.",
    href: "/leadership-team-development",
    cta: "Explore Team Development",
  },
  {
    number: "03",
    title: "Organisational Capability",
    question:
      "What must change in the organisation so that effective leadership is possible and sustainable?",
    summary:
      "For leaders thinking about scale, succession, or what happens when a key person leaves.",
    href: "/organisational-capability",
    cta: "Start With the Diagnostic",
  },
];

export function PillarsSection() {
  return (
    <section className="bg-[var(--obi-bg-elevated)] px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
        <aside className="lg:sticky lg:top-28 lg:w-[32%] lg:shrink-0 xl:w-[30%]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--obi-gold)]">
            Our Differentiator
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
            We connect the leader, the leadership team, and the organisation
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65">
            Many firms develop individuals. Others redesign structures. We
            connect all three so leadership becomes deep-rooted — part of
            culture, not dependent on a few people.
          </p>
          <div className="my-16 md:my-20 lg:my-12">
            <VennDiagram />
          </div>
        </aside>

        <div className="min-w-0 flex-1 divide-y divide-white/10 border-t border-white/10 lg:border-t-0">
          {pillars.map((pillar) => (
            <article
              key={pillar.href}
              className="grid gap-6 py-12 md:grid-cols-[5rem_1fr] md:gap-10 md:py-16"
            >
              <p className="font-display text-4xl text-[var(--obi-gold)]/80 md:text-5xl">
                {pillar.number}
              </p>
              <div>
                <h3 className="text-2xl font-semibold text-white md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 font-display text-xl italic leading-relaxed text-white/80 md:text-2xl">
                  &ldquo;{pillar.question}&rdquo;
                </p>
                <p className="mt-5 text-base leading-7 text-white/55">
                  {pillar.summary}
                </p>
                <Link
                  href={pillar.href}
                  className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:bg-white/90"
                >
                  {pillar.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
