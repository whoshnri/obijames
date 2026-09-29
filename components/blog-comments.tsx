"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { PublicComment } from "@/lib/content";

type CaptchaChallenge = { token: string; image: string; expiresAt: number };

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-[var(--obi-border)] bg-white px-4 py-3 text-sm text-[var(--obi-navy)] outline-none transition placeholder:text-[var(--obi-muted)]/60 focus:border-[var(--obi-navy)]";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function formatCommentDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function BlogComments({
  slug,
  initialComments,
}: {
  slug: string;
  initialComments: PublicComment[];
}) {
  const [comments] = useState(initialComments);
  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [answer, setAnswer] = useState("");
  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const requestCaptcha = useCallback(async () => {
    const response = await fetch("/api/blogs/captcha", { cache: "no-store" });
    if (!response.ok) throw new Error("Captcha unavailable");
    return (await response.json()) as CaptchaChallenge;
  }, []);

  const refreshCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      setCaptcha(await requestCaptcha());
      setAnswer("");
    } catch {
      setCaptcha(null);
    } finally {
      setCaptchaLoading(false);
    }
  }, [requestCaptcha]);

  useEffect(() => {
    let cancelled = false;
    requestCaptcha()
      .then((challenge) => {
        if (cancelled) return;
        setCaptcha(challenge);
        setAnswer("");
      })
      .catch(() => {
        if (!cancelled) setCaptcha(null);
      })
      .finally(() => {
        if (!cancelled) setCaptchaLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [requestCaptcha]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !body.trim()) {
      setError("Please add your name, email and comment.");
      setStatus("error");
      return;
    }
    if (!captcha) {
      setError("The verification code is still loading. Please try again.");
      setStatus("error");
      return;
    }
    if (!answer.trim()) {
      setError("Please enter the code shown in the image.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/blogs/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: name.trim(),
          email: email.trim(),
          body: body.trim(),
          captchaToken: captcha.token,
          captchaAnswer: answer.trim(),
          website,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? "Could not post your comment.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setBody("");
      setAnswer("");
      setWebsite("");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Could not post your comment.",
      );
      setStatus("error");
      await refreshCaptcha();
    }
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="border-t border-[var(--obi-border)] pt-12">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--obi-navy)] md:text-3xl">
          Comments
          {comments.length > 0 ? (
            <span className="ml-3 align-middle text-sm font-semibold tracking-[0.14em] text-[var(--obi-muted)] uppercase">
              {comments.length}
            </span>
          ) : null}
        </h2>

        {comments.length === 0 ? (
          <p className="mt-5 text-base leading-7 text-[var(--obi-muted)]">
            No comments yet — be the first to add to the conversation.
          </p>
        ) : (
          <ul className="mt-8 space-y-8">
            {comments.map((comment) => (
              <li key={comment.id} className="flex gap-4">
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--obi-navy)]/10 text-sm font-semibold text-[var(--obi-navy)]"
                >
                  {getInitials(comment.name)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--obi-navy)]">
                    {comment.name}
                    <span className="ml-3 text-xs font-normal tracking-wide text-[var(--obi-muted)]">
                      {formatCommentDate(comment.createdAt)}
                    </span>
                  </p>
                  <p className="mt-2 text-base leading-7 whitespace-pre-line text-[var(--obi-muted)]">
                    {comment.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-12 border-t border-[var(--obi-border)] pt-12">
        <h3 className="text-lg font-bold tracking-tight text-[var(--obi-navy)]">
          Leave a comment
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--obi-muted)]">
          Comments are reviewed before they appear. Your email is never published.
        </p>

        {status === "success" ? (
          <div className="mt-6 border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
            <p className="font-semibold">Thank you — your comment is in review.</p>
            <p className="mt-1">
              We read every reply and publish the ones that add to the conversation.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-3 text-sm font-semibold underline underline-offset-4"
            >
              Write another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold tracking-[0.12em] text-[var(--obi-muted)] uppercase">
                  Name
                </span>
                <input
                  className={`${inputClass} mt-2`}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold tracking-[0.12em] text-[var(--obi-muted)] uppercase">
                  Email
                </span>
                <input
                  className={`${inputClass} mt-2`}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold tracking-[0.12em] text-[var(--obi-muted)] uppercase">
                Comment
              </span>
              <textarea
                className={`${inputClass} mt-2`}
                rows={5}
                value={body}
                onChange={(event) => setBody(event.target.value)}
                required
              />
            </label>

            <div className="hidden" aria-hidden>
              <label>
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </label>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex items-end gap-3">
                <span className="flex h-[72px] w-[216px] items-center justify-center border border-[var(--obi-border)] bg-[#eef3f7]">
                  {captchaLoading ? (
                    <span className="text-xs tracking-[0.14em] text-[var(--obi-muted)] uppercase">
                      Loading…
                    </span>
                  ) : captcha ? (
                    <img
                      src={captcha.image}
                      alt="Verification code"
                      width={216}
                      height={72}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="px-3 text-center text-xs text-[var(--obi-muted)]">
                      Code unavailable
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => void refreshCaptcha()}
                  disabled={captchaLoading}
                  className="mb-1 text-xs font-semibold text-[var(--obi-muted)] underline underline-offset-4 transition hover:text-[var(--obi-navy)] disabled:opacity-50"
                >
                  New code
                </button>
              </div>

              <label className="block flex-1">
                <span className="text-xs font-semibold tracking-[0.12em] text-[var(--obi-muted)] uppercase">
                  Type the code
                </span>
                <input
                  className={`${inputClass} mt-2`}
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  required
                />
              </label>
            </div>

            {status === "error" && error ? (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting" || captchaLoading}
              className="inline-flex bg-[var(--obi-navy)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Posting…" : "Post comment"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
