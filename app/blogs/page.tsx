import type { Metadata } from "next";
import Link from "next/link";
import { BlogsList } from "@/components/blogs-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopBar } from "@/components/top-bar";
import { fetchPublishedBlogsPage, toBlogCard } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blogs | Obi James Consultancy",
  description:
    "Leadership insights on letting go, building capability, and leading organisations that last.",
};

export const revalidate = 60;

export default async function BlogsPage() {
  const page = await fetchPublishedBlogsPage({ limit: 10, offset: 0 });
  const posts = page.posts.map(toBlogCard);
  const total = page.total;
  const categories = page.categories;

  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="border-b border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-16 md:px-10 md:py-24 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-5xl lg:text-6xl">
              Insights
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--obi-muted)] md:text-lg md:leading-8">
              Practical writing on leadership, teams, and the organisational
              conditions that make shared ownership possible.
            </p>
          </div>
        </section>

        <section className="bg-[var(--obi-bg-elevated)] px-6 py-16 md:px-10 md:py-20 lg:px-14">
          <div className="mx-auto max-w-7xl">
            {total === 0 ? (
              <div className="border border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-16 text-center">
                <p className="text-lg font-semibold text-[var(--obi-navy)]">
                  New articles are on the way
                </p>
                <p className="mt-3 text-[var(--obi-muted)]">
                  Check back soon, or talk to us about a diagnostic in the meantime.
                </p>
                <Link
                  href="mailto:info@obijames.com"
                  className="mt-8 inline-flex bg-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
                >
                  Start a conversation
                </Link>
              </div>
            ) : (
              <BlogsList
                initialPosts={posts}
                initialTotal={total}
                initialCategories={categories}
              />
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
