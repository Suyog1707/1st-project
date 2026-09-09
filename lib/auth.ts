import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  COOKIE_NAME,
  SESSION_MAX_AGE,
  signSession,
  verifySession,
  type SessionPayload,
  type SessionUser,
} from '@/lib/session';

/** Read + verify the current session. Call from Server Components / Actions / Route Handlers. */
export async function getSession(): Promise<SessionPayload | null> {
  return verifySession(cookies().get(COOKIE_NAME)?.value);
}

/** Set the signed cookie. Call ONLY inside a Server Action or Route Handler. */
export async function createSession(
  sub: string,
  role: SessionPayload['role'],
  accessToken: string | undefined,
  user: SessionUser | undefined,
): Promise<void> {
  const token = await signSession({
    sub,
    role,
    accessToken,
    user,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  });
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

/** Clear the cookie. Call ONLY inside a Server Action or Route Handler. */
export function destroySession(): void {
  cookies().delete(COOKIE_NAME);
}

/** Guard a page: redirect to /login when signed out. Returns a non-null session. */
export async function requireSession(): Promise<SessionPayload> {
  const s = await getSession();
  if (!s) redirect('/login');
  return s;
}

/** Guard by role. */
export async function requireRole(role: SessionPayload['role']): Promise<SessionPayload> {
  const s = await requireSession();
  if (s.role !== role) redirect('/login');
  return s;
}
