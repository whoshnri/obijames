import Image from "next/image";
import Link from "next/link";
import { StatsBar } from "./stats-bar";

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="hero-glow relative flex min-h-screen flex-col overflow-hidden">
      <div className="flex flex-1 flex-col justify-center px-6 pb-8 pt-4 md:px-10 lg:px-14">
        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--obi-gold)]">
              Executive Advisory
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              Leadership shouldn&apos;t depend on a handful of people
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              We help organisations build leaders, leadership teams, and
              systems so performance holds when anyone steps away.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/organisational-capability"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[var(--obi-navy)] transition hover:bg-white/90"
              >
                Start With the Organisational Capability Diagnostic
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--obi-navy)]/10 text-[var(--obi-navy)]">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
            <div className="absolute -inset-4 rounded-[2rem] bg-[var(--obi-gold)]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/obi-james-high-res.png"
                  alt="Obi James, Founder of Obi James Consultancy"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d18] via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-16">
                <p className="font-display text-xl font-semibold text-white">Obi James</p>
                <p className="mt-1 text-sm font-medium text-white/60">
                  Founder, Obi James Consultancy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsBar />
    </section>
  );
}
