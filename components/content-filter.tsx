"use client";

import { useEffect, type ReactNode } from "react";

export function ContentToolbar({
  query,
  onQueryChange,
  onOpenFilters,
  activeFilterCount,
  placeholder,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="relative min-w-0 flex-1">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--obi-muted)]"
        >
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          className="w-full border border-[var(--obi-border)] bg-white py-3 pr-4 pl-11 text-sm text-[var(--obi-navy)] outline-none transition placeholder:text-[var(--obi-muted)]/60 focus:border-[var(--obi-navy)]"
        />
      </div>
      <button
        type="button"
        onClick={onOpenFilters}
        className="inline-flex shrink-0 items-center justify-center gap-2 border border-[var(--obi-border)] bg-white px-3.5 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]/40 sm:px-5"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M2 4h12M4.5 8h7M7 12h2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="hidden sm:inline">Filters</span>
        {activeFilterCount > 0 ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--obi-navy)] px-1.5 text-xs font-semibold text-white">
            {activeFilterCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}

export function FilterModal({
  open,
  onClose,
  title,
  onClear,
  clearDisabled,
  resultCount,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  onClear: () => void;
  clearDisabled: boolean;
  resultCount: number;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[var(--obi-navy)]/70 px-4 py-6 sm:items-center"
    >
      <div onClick={(event) => event.stopPropagation()} className="w-full max-w-md bg-white">
        <div className="flex items-center justify-between border-b border-[var(--obi-border)] px-5 py-4">
          <h2 className="text-xs font-semibold tracking-[0.14em] text-[var(--obi-navy)] uppercase">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="inline-flex h-8 w-8 items-center justify-center text-[var(--obi-muted)] transition hover:text-[var(--obi-navy)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-5 py-4">{children}</div>
        <div className="flex items-center justify-between border-t border-[var(--obi-border)] px-5 py-4">
          <button
            type="button"
            onClick={onClear}
            disabled={clearDisabled}
            className="text-sm font-semibold text-[var(--obi-muted)] transition hover:text-[var(--obi-navy)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex bg-[var(--obi-navy)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
          >
            Show {resultCount}
          </button>
        </div>
      </div>
    </div>
  );
}

export function FilterCheckbox({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 border-b border-[var(--obi-border)] py-3 last:border-b-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="h-4 w-4 accent-[var(--obi-navy)]"
      />
      <span className="text-sm font-medium text-[var(--obi-navy)]">{label}</span>
    </label>
  );
}
