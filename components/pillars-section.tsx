import Link from "next/link";
import { RoughAnnotate } from "./rough-annotate";
import { VennDiagram } from "./venn-diagram";

const pillars = [
  {
    number: "01",
    title: "Executive Development",
    question:
      "Who must this leader become for the organisation to succeed at its next level?",
    summary:
      "Developing leaders who can share power, grow capability and lead through others",
    href: "/executive-development",
    cta: "Explore Executive Development",
  },
  {
    number: "02",
    title: "Leadership Team Development",
    question:
      "What must become possible between these leaders for the organisation to perform?",
    summary:
      "Enabling senior teams to operate as one and take collective ownership of organisational performance.",
    href: "/leadership-team-development",
    cta: "Explore Team Development",
  },
  {
    number: "03",
    title: "Organisational Capability",
    question:
      "What must change in the organisation so that effective leadership is possible and sustainable?",
    summary:
      "Building the structures, systems and leadership architecture required to perform, transform and scale.",
    href: "/organisational-capability",
    cta: "Explore Organisational Capability",
  },
];

export function PillarsSection() {
  return (
    <section className="bg-[var(--obi-bg)] px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
        <aside className="lg:w-[45%] lg:shrink-0">
          <h2 className="text-4xl font-bold text-[var(--obi-navy)] sm:text-5xl lg:text-6xl">
            From leadership dependency to organisational capability
          </h2>
          <p className="mt-6 text-lg text-[var(--obi-muted)]">
            Many firms develop individuals. Others redesign structures. We{" "}
            <RoughAnnotate
              type="circle"
              color="var(--obi-gold)"
              strokeWidth={1.5}
              iterations={2}
              padding={4}
            >
              connect
            </RoughAnnotate>{" "}
            all three so leadership becomes deep-rooted - part of culture, not
            dependent on a few people.
          </p>
          <div className="my-16 md:my-20 lg:my-12">
            <VennDiagram />
          </div>
        </aside>

        <div className="min-w-0 flex-1 divide-y divide-[var(--obi-border)] border-t border-[var(--obi-border)] lg:border-t-0">
          {pillars.map((pillar) => (
            <article
              key={pillar.href}
              className="grid gap-3 py-12 grid-cols-[5rem_1fr] md:gap-10 md:py-16"
            >
              <p className="text-4xl font-bold text-[var(--obi-gold)] md:text-5xl">
                {pillar.number}
              </p>
              <div>
                <h3 className="text-2xl font-bold text-[var(--obi-navy)] md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-xl font-display text-[var(--obi-navy)]/80 md:text-2xl">
                  &ldquo;{pillar.question}&rdquo;
                </p>
                <p className="mt-5 text-base text-[var(--obi-muted)]">
                  {pillar.summary}
                </p>
                <Link
                  href={pillar.href}
                  className="mt-8 inline-flex bg-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
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
