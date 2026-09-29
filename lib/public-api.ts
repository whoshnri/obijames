const DEFAULT_API_URL = "http://localhost:5050";

export function getPublicApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_OBI_API_URL?.replace(/\/$/, "") ||
    process.env.OBI_API_URL?.replace(/\/$/, "") ||
    DEFAULT_API_URL
  );
}

export async function publicApiPost<T>(path: string, body: unknown): Promise<T> {
  const url = `${getPublicApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as
    | ({ error?: string } & Record<string, unknown>)
    | null;

  if (!response.ok) {
    throw new Error(payload?.error ?? "Something went wrong. Please try again.");
  }

  return payload as T;
}

export async function publicApiGet<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  const url = `${getPublicApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
      next: init?.cache ? undefined : { revalidate: 60 },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
