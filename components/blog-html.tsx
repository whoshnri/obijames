import sanitizeHtml from "sanitize-html";

const blogHtmlOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "s",
    "blockquote",
    "ul",
    "ol",
    "li",
    "a",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "code",
    "pre",
    "hr",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "img",
    "figure",
    "figcaption",
    "span",
    "div",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel", "title"],
    img: ["src", "alt", "title", "width", "height"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
    "*": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "noreferrer noopener",
      target: "_blank",
    }),
  },
};

export function sanitizeBlogHtml(value: string) {
  return sanitizeHtml(value, blogHtmlOptions);
}

export function BlogHtml({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const sanitized = sanitizeBlogHtml(html || "");

  return (
    <div
      className={[
        "blog-html max-w-none text-base leading-8 text-[var(--obi-navy)]/85",
        "[&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-[var(--obi-navy)]",
        "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[var(--obi-navy)]",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[var(--obi-navy)]",
        "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[var(--obi-navy)]",
        "[&_p]:my-5 [&_p]:leading-8",
        "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
        "[&_li]:leading-7",
        "[&_a]:font-semibold [&_a]:text-[var(--obi-navy)] [&_a]:underline [&_a]:underline-offset-4",
        "[&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--obi-accent)] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[var(--obi-muted)]",
        "[&_hr]:my-10 [&_hr]:border-[var(--obi-border)]",
        "[&_img]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:object-cover",
        "[&_figure]:my-8",
        "[&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:text-[var(--obi-muted)]",
        "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:bg-[var(--obi-navy)] [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-white",
        "[&_code]:rounded-sm [&_code]:bg-[var(--obi-bg)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em]",
        "[&_table]:my-8 [&_table]:w-full [&_table]:border-collapse",
        "[&_th]:border [&_th]:border-[var(--obi-border)] [&_th]:bg-[var(--obi-bg)] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left",
        "[&_td]:border [&_td]:border-[var(--obi-border)] [&_td]:px-3 [&_td]:py-2",
        className ?? "",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
