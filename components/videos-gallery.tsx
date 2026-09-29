"use client";

import { useMemo, useState } from "react";
import { ContentToolbar, FilterCheckbox, FilterModal } from "@/components/content-filter";
import { VideoCard } from "@/components/video-card";
import { VideoModal } from "@/components/video-modal";
import { collectVideoCategories } from "@/lib/videos";
import type { PublicVideo } from "@/lib/content";

export function VideosGallery({ videos }: { videos: PublicVideo[] }) {
  const categories = useMemo(() => collectVideoCategories(videos), [videos]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [playing, setPlaying] = useState<PublicVideo | null>(null);

  const toggleCategory = (category: string) =>
    setSelected((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );

  const filtered = useMemo(() => {
    const lookup = query.trim().toLowerCase();
    return videos.filter((video) => {
      const matchesQuery =
        !lookup ||
        `${video.title} ${video.description ?? ""} ${video.category ?? ""}`
          .toLowerCase()
          .includes(lookup);
      const matchesCategory =
        selected.length === 0 ||
        (video.category ? selected.includes(video.category.trim()) : false);
      return matchesQuery && matchesCategory;
    });
  }, [query, selected, videos]);

  return (
    <div>
      <ContentToolbar
        query={query}
        onQueryChange={setQuery}
        onOpenFilters={() => setFiltersOpen(true)}
        activeFilterCount={selected.length}
        placeholder="Search videos"
      />

      {filtered.length === 0 ? (
        <p className="mt-12 border border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-12 text-center text-sm text-[var(--obi-muted)]">
          No videos match your search.
        </p>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video) => (
            <VideoCard key={video.id} video={video} size="lg" onSelect={setPlaying} />
          ))}
        </div>
      )}

      <FilterModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filter videos"
        onClear={() => setSelected([])}
        clearDisabled={selected.length === 0}
        resultCount={filtered.length}
      >
        {categories.length === 0 ? (
          <p className="text-sm text-[var(--obi-muted)]">No categories available.</p>
        ) : (
          categories.map((category) => (
            <FilterCheckbox
              key={category}
              label={category}
              checked={selected.includes(category)}
              onToggle={() => toggleCategory(category)}
            />
          ))
        )}
      </FilterModal>

      {playing ? <VideoModal video={playing} onClose={() => setPlaying(null)} /> : null}
    </div>
  );
}
