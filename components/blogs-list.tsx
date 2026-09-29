"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlogCard } from "@/components/blog-card";
import { ContentToolbar, FilterCheckbox, FilterModal } from "@/components/content-filter";
import type { BlogPostCard as BlogPost } from "@/lib/content";

type BlogsResponse = {
  posts: BlogPost[];
  total: number;
  limit: number;
  offset: number;
  categories: string[];
};

function isGenericCategory(category?: string | null) {
  if (!category) return true;
  const normalized = category.trim().toLowerCase();
  return normalized === "blog" || normalized === "blogs" || normalized === "uncategorized";
}

function buildUrl({
  query,
  categories,
  limit,
  offset,
}: {
  query: string;
  categories: string[];
  limit: number;
  offset: number;
}) {
  const search = new URLSearchParams();
  if (query.trim()) search.set("q", query.trim());
  for (const category of categories) search.append("category", category);
  search.set("limit", String(limit));
  search.set("offset", String(offset));
  return `/api/blogs?${search.toString()}`;
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BlogsList({
  initialPosts,
  initialTotal,
  initialCategories,
  pageSize = 10,
}: {
  initialPosts: BlogPost[];
  initialTotal: number;
  initialCategories: string[];
  pageSize?: number;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const skipInitialFetch = useRef(true);

  const toggleCategory = (category: string) =>
    setSelected((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 300);
    return () => window.clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetch(
      buildUrl({ query: debouncedQuery, categories: selected, limit: pageSize, offset: 0 }),
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error("Search failed");
        return response.json() as Promise<BlogsResponse>;
      })
      .then((data) => {
        setPosts(data.posts);
        setTotal(data.total);
        if (data.categories?.length) setCategories(data.categories);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setError("Something went wrong while searching. Please try again.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery, selected, pageSize]);

  const loadMore = useCallback(async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setError("");

    try {
      const response = await fetch(
        buildUrl({
          query: debouncedQuery,
          categories: selected,
          limit: pageSize,
          offset: posts.length,
        }),
      );
      if (!response.ok) throw new Error("Load failed");
      const data = (await response.json()) as BlogsResponse;
      setPosts((current) => [...current, ...data.posts]);
      setTotal(data.total);
      if (data.categories?.length) setCategories(data.categories);
    } catch {
      setError("Could not load more insights. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  }, [debouncedQuery, selected, posts.length, pageSize, loadingMore]);

  const filterCategories = useMemo(
    () =>
      categories
        .filter((category) => !isGenericCategory(category))
        .sort((a, b) => a.localeCompare(b)),
    [categories],
  );

  const busy = loading || query !== debouncedQuery;
  const hasMore = posts.length > 0 && posts.length < total;

  return (
    <div>
      <ContentToolbar
        query={query}
        onQueryChange={setQuery}
        onOpenFilters={() => setFiltersOpen(true)}
        activeFilterCount={selected.length}
        placeholder="Search insights"
      />

      {error ? (
        <p className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex h-5 items-center gap-2 text-xs font-semibold tracking-[0.12em] text-[var(--obi-muted)] uppercase">
        {busy ? (
          <>
            <Spinner />
            <span>Searching…</span>
          </>
        ) : null}
      </div>

      {posts.length === 0 ? (
        <p className="mt-6 border border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-12 text-center text-sm text-[var(--obi-muted)]">
          No insights match your search.
        </p>
      ) : (
        <div
          aria-busy={busy}
          className={[
            "mt-4 grid grid-cols-2 gap-x-4 gap-y-8 transition-opacity duration-200 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3",
            busy ? "pointer-events-none opacity-40" : "opacity-100",
          ].join(" ")}
        >
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} size="lg" />
          ))}
        </div>
      )}

      {hasMore ? (
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore || busy}
            className="inline-flex items-center gap-2 border border-[var(--obi-navy)]/25 bg-white px-7 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingMore ? (
              <>
                <Spinner />
                Loading…
              </>
            ) : (
              "Load more"
            )}
          </button>
          <p className="text-xs text-[var(--obi-muted)]">
            Showing {posts.length} of {total}
          </p>
        </div>
      ) : null}

      <FilterModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filter insights"
        onClear={() => setSelected([])}
        clearDisabled={selected.length === 0}
        resultCount={total}
      >
        {filterCategories.length === 0 ? (
          <p className="text-sm text-[var(--obi-muted)]">No categories available.</p>
        ) : (
          filterCategories.map((category) => (
            <FilterCheckbox
              key={category}
              label={category}
              checked={selected.includes(category)}
              onToggle={() => toggleCategory(category)}
            />
          ))
        )}
      </FilterModal>
    </div>
  );
}
