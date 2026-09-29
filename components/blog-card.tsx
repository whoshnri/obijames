import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";

function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function isGenericCategory(category?: string | null) {
  if (!category) return true;
  const normalized = category.trim().toLowerCase();
  return normalized === "blog" || normalized === "blogs" || normalized === "uncategorized";
}

type BlogCardProps = {
  post: BlogPost;
  /** Larger title/spacing for the /blogs index. */
  size?: "sm" | "lg";
};

export function BlogCard({ post, size = "sm" }: BlogCardProps) {
  const showCategory = !isGenericCategory(post.category);

  return (
    <article className="group relative flex h-full flex-col">
      <Link
        href={post.href}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--obi-navy)]/5">
        <Image
          src={post.image || "/obi1.jpeg"}
          alt=""
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
          sizes={
            size === "lg"
              ? "(max-width: 1024px) 90vw, 33vw"
              : "(max-width: 1024px) 90vw, 25vw"
          }
          unoptimized={(post.image ?? "").startsWith("http")}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[var(--obi-navy)]/0 transition duration-500 group-hover:bg-[var(--obi-navy)]/25"
        />
        <span
          aria-hidden
          className="absolute right-4 bottom-4 inline-flex h-10 w-10 translate-y-2 items-center justify-center bg-white text-[var(--obi-navy)] opacity-0 shadow-sm transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9h10M9.5 4.5 14 9l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div
        className={
          size === "lg"
            ? "mt-3 flex flex-1 flex-col sm:mt-5"
            : "mt-3 flex flex-1 flex-col"
        }
      >
        {showCategory ? (
          <p
            className={[
              "font-semibold tracking-[0.14em] text-[var(--obi-muted)] uppercase",
              size === "lg" ? "text-[10px] sm:text-xs" : "text-xs",
            ].join(" ")}
          >
            {post.category}
          </p>
        ) : null}
        <h3
          className={[
            "font-bold tracking-tight text-[var(--obi-navy)] transition duration-300 group-hover:text-[var(--obi-navy-light)]",
            showCategory ? "mt-2" : "mt-0",
            size === "lg"
              ? "text-sm leading-snug sm:text-lg md:text-xl lg:text-[1.35rem]"
              : "text-base leading-snug md:text-lg",
          ].join(" ")}
        >
          <span className="bg-gradient-to-r from-[var(--obi-navy)] to-[var(--obi-navy)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
            {post.title}
          </span>
        </h3>
        {post.excerpt && size === "lg" ? (
          <p className="mt-3 hidden line-clamp-2 text-sm leading-6 text-[var(--obi-muted)] transition duration-300 group-hover:text-[var(--obi-navy)]/70 sm:block">
            {post.excerpt}
          </p>
        ) : null}
        <p
          className={[
            "mt-auto text-[var(--obi-muted)] transition duration-300 group-hover:text-[var(--obi-navy)]/65",
            size === "lg" ? "pt-3 text-[10px] sm:pt-4 sm:text-xs" : "pt-4 text-xs",
          ].join(" ")}
        >
          {post.author} · {formatBlogDate(post.date)}
        </p>
      </div>
    </article>
  );
}
