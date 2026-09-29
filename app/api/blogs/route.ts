import { NextResponse } from "next/server";
import { fetchPublishedBlogsPage, toBlogCard } from "@/lib/content";

export const dynamic = "force-dynamic";

const MAX_LIMIT = 24;

export async function GET(request: Request) {
  const url = new URL(request.url);

  const limitRaw = Number(url.searchParams.get("limit") ?? "10");
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(Math.trunc(limitRaw), 1), MAX_LIMIT)
    : 10;
  const offsetRaw = Number(url.searchParams.get("offset") ?? "0");
  const offset = Number.isFinite(offsetRaw)
    ? Math.max(Math.trunc(offsetRaw), 0)
    : 0;

  const page = await fetchPublishedBlogsPage({
    q: url.searchParams.get("q") ?? "",
    categories: url.searchParams.getAll("category"),
    limit,
    offset,
  });

  return NextResponse.json({
    ...page,
    posts: page.posts.map(toBlogCard),
  });
}
