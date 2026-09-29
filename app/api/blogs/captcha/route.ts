import { NextResponse } from "next/server";
import { publicApiGet } from "@/lib/public-api";

export const dynamic = "force-dynamic";

type CaptchaChallenge = {
  token: string;
  image: string;
  expiresAt: number;
};

export async function GET() {
  const challenge = await publicApiGet<CaptchaChallenge>(
    "/public/blogs/captcha",
    { cache: "no-store" },
  );

  if (!challenge) {
    return NextResponse.json(
      { error: "Could not load a verification code." },
      { status: 502 },
    );
  }

  return NextResponse.json(challenge, {
    headers: { "Cache-Control": "no-store" },
  });
}
