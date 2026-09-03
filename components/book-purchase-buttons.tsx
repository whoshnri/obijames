import Link from "next/link";
import { bookLinks } from "@/lib/book";

const purchaseActions = [
  { label: "Amazon UK", href: bookLinks.amazonUk, external: true },
  { label: "Amazon US", href: bookLinks.amazonUs, external: true },
  {
    label: "Audiobook PDF Download",
    href: bookLinks.audiobookPdf,
    external: true,
  },
] as const;

type BookPurchaseButtonsProps = {
  className?: string;
  includeContactNote?: boolean;
};

export function BookPurchaseButtons({
  className = "",
  includeContactNote = true,
}: BookPurchaseButtonsProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        {purchaseActions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
          >
            {action.label}
          </a>
        ))}
      </div>
      {includeContactNote ? (
        <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--obi-muted)]">
          For any enquiries regarding discounts and stock for bulk orders,
          please get in touch via our{" "}
          <Link
            href={bookLinks.contact}
            className="font-semibold text-[var(--obi-navy)] underline underline-offset-2 transition hover:text-[var(--obi-navy-light)]"
          >
            contact us
          </Link>{" "}
          page.
        </p>
      ) : null}
    </div>
  );
}
