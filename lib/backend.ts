// lib/backend.ts — typed client for the existing Express JWT backend.

export type BackendUser = {
  _id: string;
  username?: string;
  email?: string;
  fullName?: string;
  avatar?: { url?: string; secure_url?: string; public_id?: string };
  coverImage?: { url?: string; secure_url?: string; public_id?: string };
  watchHistory?: string[];
};

export type LoginData = {
  user: BackendUser;
  accessToken: string;
  refreshToken: string;
};

export type ApiEnvelope<T> = {
  statusCode: number;
  data: T | null;
  message: string;
  success: boolean;
};

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    cache: 'no-store',
  });

  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    body = null;
  }

  if (!res.ok) {
    throw new Error(body?.message ?? `Request failed with status ${res.status}`);
  }
  if (!body || body.data === null || body.data === undefined) {
    throw new Error(body?.message ?? 'Unexpected empty response');
  }
  return body.data;
}

/** Log in against the backend. Accepts an email OR a username in `identifier`. */
export async function backendLogin(identifier: string, password: string): Promise<LoginData> {
  return request<LoginData>('/api/v1/user/login', {
    method: 'POST',
    body: JSON.stringify({ username: identifier, email: identifier, password }),
  });
}

/** Fetch the authenticated user with a bearer access token. */
export async function getCurrentUser(accessToken: string): Promise<BackendUser> {
  return request<BackendUser>('/api/v1/user/get-current-user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

/** Best-effort server-side logout (clears the backend refresh token). */
export async function backendLogout(accessToken: string): Promise<void> {
  await request<Record<string, never>>('/api/v1/user/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
