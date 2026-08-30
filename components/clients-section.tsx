import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { clientLogos, type ClientLogo } from "@/lib/site-content";

const clientRows = [
  clientLogos.filter((_, index) => index % 3 === 0),
  clientLogos.filter((_, index) => index % 3 === 1),
  clientLogos.filter((_, index) => index % 3 === 2),
];

function ClientLogoCard({ client }: { client: ClientLogo }) {
  return (
    <div className="flex h-20 w-[calc(33vw-1rem)] max-w-36 shrink-0 items-center justify-center bg-white px-3 md:h-24 md:w-44 md:max-w-none md:px-5 lg:h-28 lg:w-52">
      <Image
        src={client.image}
        alt={client.name}
        width={180}
        height={80}
        className="h-auto w-full max-w-full object-contain"
      />
    </div>
  );
}

export function ClientsSection() {
  return (
    <section className="border-t border-white/10 bg-[var(--obi-bg-elevated)] px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="mt-5 font-bold text-4xl leading-[1.1] text-white sm:text-5xl">
            Trusted by organisations across sectors and geographies
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65">
            From global corporates to public sector institutions and charitable
            foundations, we partner with leaders building capability that lasts
            beyond any one individual.
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-[100vw] md:mt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--obi-bg-elevated)] via-[var(--obi-bg-elevated)]/80 to-transparent sm:w-20 md:w-28 lg:w-36"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--obi-bg-elevated)] via-[var(--obi-bg-elevated)]/80 to-transparent sm:w-20 md:w-28 lg:w-36"
        />

        <div className="space-y-4 md:space-y-5">
          {clientRows.map((row, index) => (
            <Marquee
              key={index}
              reverse={index % 2 === 1}
              pauseOnHover
              className="[--duration:35s] [--gap:0.75rem] p-0 md:[--duration:50s] md:[--gap:1rem]"
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
