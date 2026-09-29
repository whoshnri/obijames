import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogHtml } from "@/components/blog-html";
import { BlogComments } from "@/components/blog-comments";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopBar } from "@/components/top-bar";
import {
  fetchBlogComments,
  fetchPublishedBlogBySlug,
  fetchPublishedBlogs,
  formatContentDate,
} from "@/lib/content";

export const revalidate = 60;

type BlogSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await fetchPublishedBlogs(100);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedBlogBySlug(slug);
  if (!post) {
    return { title: "Article | Obi James Consultancy" };
  }
  return {
    title: `${post.seoTitle || post.title} | Obi James Consultancy`,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const post = await fetchPublishedBlogBySlug(slug);
  if (!post) notFound();
  const comments = await fetchBlogComments(post.slug);

  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <article>
          <header className="bg-[var(--obi-bg)] px-6 pt-14 pb-10 md:px-10 md:pt-20 lg:px-14">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blogs"
                className="group inline-flex items-center gap-2 border border-[var(--obi-navy)]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)] hover:bg-[var(--obi-navy)] hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                >
                  <path
                    d="M10 3.5 5.5 8 10 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                All insights
              </Link>
              {post.category &&
              post.category.trim().toLowerCase() !== "blog" &&
              post.category.trim().toLowerCase() !== "blogs" &&
              post.category.trim().toLowerCase() !== "uncategorized" ? (
                <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-[var(--obi-muted)] uppercase">
                  {post.category}
                </p>
              ) : null}
              <h1
                className={[
                  "text-4xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-5xl lg:leading-[1.08]",
                  post.category &&
                  post.category.trim().toLowerCase() !== "blog" &&
                  post.category.trim().toLowerCase() !== "blogs" &&
                  post.category.trim().toLowerCase() !== "uncategorized"
                    ? "mt-4"
                    : "mt-8",
                ].join(" ")}
              >
                {post.title}
              </h1>
              <p className="mt-6 text-sm text-[var(--obi-muted)]">
                {post.authorName}
                {post.publishedAt
                  ? ` · ${formatContentDate(post.publishedAt)}`
                  : null}
              </p>
            </div>
          </header>

          {post.coverImageUrl ? (
            <div className="bg-[var(--obi-bg)] px-6 pb-10 md:px-10 lg:px-14">
              <div className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden bg-[var(--obi-navy)]/5">
                <Image
                  src={post.coverImageUrl}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1024px"
                  unoptimized={post.coverImageUrl.startsWith("http")}
                />
              </div>
            </div>
          ) : null}

          <div className="bg-[var(--obi-bg-elevated)] px-6 py-12 md:px-10 md:py-16 lg:px-14">
            <div className="mx-auto max-w-3xl">
              <BlogHtml html={post.contentHtml} />
            </div>
          </div>
        </article>

        <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-14 md:px-10 md:py-16 lg:px-14">
          <BlogComments slug={post.slug} initialComments={comments} />
        </section>

        <section className="border-t border-[var(--obi-border)] bg-[var(--obi-navy)] px-6 py-16 md:px-10 lg:px-14">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Ready to talk capability?
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                Start with a diagnostic, or bring a live leadership challenge.
              </p>
            </div>
            <Link
              href="mailto:info@obijames.com?subject=Leadership%20conversation"
              className="inline-flex bg-white px-6 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:bg-white/90"
            >
              Start a conversation
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
