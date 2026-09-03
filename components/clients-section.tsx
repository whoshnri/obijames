import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { clientLogos, type ClientLogo } from "@/lib/site-content";
import { RoughAnnotate } from "./rough-annotate";

const clientRows = [
  clientLogos.filter((_, index) => index % 3 === 0),
  clientLogos.filter((_, index) => index % 3 === 1),
  clientLogos.filter((_, index) => index % 3 === 2),
];

function ClientLogoCard({ client }: { client: ClientLogo }) {
  return (
    <div className="flex w-40 shrink-0 items-center justify-center border border-[var(--obi-border)] bg-[var(--obi-surface)] md:w-48 lg:w-56">
      <Image
        src={client.image}
        alt={client.name}
        width={200}
        height={90}
        className="h-auto w-full object-contain"
      />
    </div>
  );
}

export function ClientsSection() {
  return (
    <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold text-[var(--obi-navy)] sm:text-5xl">
            Trusted across industries for{" "}
            <RoughAnnotate
              type="highlight"
              color="#e8c96a"
              strokeWidth={1}
              iterations={1}
              multiline={false}
              className="whitespace-nowrap"
            >
              sustained outcomes
            </RoughAnnotate>{" "}
            in leadership
          </h2>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-[100vw] md:mt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--obi-bg)] via-[var(--obi-bg)]/80 to-transparent sm:w-20 md:w-28 lg:w-36"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--obi-bg)] via-[var(--obi-bg)]/80 to-transparent sm:w-20 md:w-28 lg:w-36"
        />

        <div className="space-y-1 md:space-y-2">
          {clientRows.map((row, index) => (
            <Marquee
              key={index}
              reverse={index % 2 === 1}
              pauseOnHover
              className="[--duration:35s] [--gap:0.2rem] p-0 md:[--duration:50s] md:[--gap:1rem]"
            >
              {row.map((client) => (
                <ClientLogoCard key={client.name} client={client} />
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}
