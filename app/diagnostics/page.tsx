import type { Metadata } from "next";
import Link from "next/link";
import { DiagnosticsForm } from "@/components/diagnostics-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopBar } from "@/components/top-bar";
import { serviceOfferings } from "@/lib/services";
import { ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Start a Diagnostic | Obi James Consultancy",
  description:
    "Tell us what you are working on and we will set up a discovery call to work out what will help most.",
};

export default function DiagnosticsPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="border-b border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-16 md:px-10 md:py-20 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-5xl lg:text-6xl">
              Start with a conversation
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--obi-muted)] md:text-lg md:leading-8">
              Every engagement begins with a discovery call. Share a little
              about you and your organisation, tell us when you are free, and we
              will do the rest.
            </p>
          </div>
        </section>

        <section className="bg-[var(--obi-bg-elevated)] px-6 py-14 md:px-10 md:py-20 lg:px-14">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className=" bg-white p-6 md:p-10">
              <DiagnosticsForm />
            </div>

            <aside className="space-y-8">
              <div className="border border-[var(--obi-border)] bg-[var(--obi-bg)] p-6">
                <h2 className="text-sm font-semibold text-[var(--obi-navy)] uppercase">
                  Our touch-points
                </h2>
                <ul className="mt-4 space-y-3">
                  {serviceOfferings.map((service, idx) => (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        className="group flex items-center justify-between rounded-none! gap-3 border-b border-[var(--obi-border)] pb-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:text-[var(--obi-navy-light)]"
                      >
                        {idx + 1}. {service.value}
                        <span className="transition-transform duration-300 group-hover:translate-x-0 -translate-x-3">
                          <ArrowRightIcon />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-[var(--obi-border)] bg-[var(--obi-navy)] p-6 text-white">
                <h2 className="text-sm font-semibold tracking-[0.12em] uppercase">
                  What to expect
                </h2>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-white/70">
                  <li>1. You share where you are and what you need.</li>
                  <li>2. We book a discovery call inside your window.</li>
                  <li>3. We agree what would help most - no hard sell.</li>
                </ol>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
