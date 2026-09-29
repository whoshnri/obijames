import { NextResponse } from "next/server";
import { publicApiGet, publicApiPost } from "@/lib/public-api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ comments: [] });

  const data = await publicApiGet<{ comments: unknown[] }>(
    `/public/blogs/${encodeURIComponent(slug)}/comments`,
    { cache: "no-store" },
  );

  return NextResponse.json(data ?? { comments: [] });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;

  const slug = typeof payload?.slug === "string" ? payload.slug : "";
  if (!slug) {
    return NextResponse.json({ error: "Missing article." }, { status: 400 });
  }

  try {
    const result = await publicApiPost(
      `/public/blogs/${encodeURIComponent(slug)}/comments`,
      {
        name: payload?.name,
        email: payload?.email,
        body: payload?.body,
        captchaToken: payload?.captchaToken,
        captchaAnswer: payload?.captchaAnswer,
        website: payload?.website,
      },
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not post your comment. Please try again.",
      },
      { status: 400 },
    );
  }
}
