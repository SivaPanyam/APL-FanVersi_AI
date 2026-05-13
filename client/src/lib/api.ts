const API_BASE = "/api";

export type ApiError = {
  message: string;
  status?: number;
};

async function parseJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { message: text };
  }
}

export async function postJson<T>(
  path: string,
  body: unknown,
  idToken?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (idToken) headers.Authorization = `Bearer ${idToken}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const payload = (await parseJsonSafe(res)) as Record<string, unknown> | null;

  if (!res.ok) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : typeof payload?.error === "string"
          ? payload.error
          : `Request failed (${res.status})`;
    const err: ApiError = { message, status: res.status };
    throw err;
  }

  return payload as T;
}
