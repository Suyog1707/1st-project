'use server';
import { redirect } from 'next/navigation';
import { createSession, destroySession, getSession } from '@/lib/auth';
import { backendLogin, backendLogout } from '@/lib/backend';
import type { SessionUser } from '@/lib/session';

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const identifier = String(formData.get('identifier') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const next = String(formData.get('next') ?? '/') || '/';

  if (!identifier || !password) {
    return { error: 'Enter your email or username and password.' };
  }

  let data;
  try {
    data = await backendLogin(identifier, password);
  } catch {
    return { error: 'Unable to sign in. Check your details and try again.' };
  }

  const user: SessionUser = {
    id: data.user._id,
    username: data.user.username ?? '',
    email: data.user.email ?? '',
    fullName: data.user.fullName ?? '',
    avatar: data.user.avatar?.url,
  };

  await createSession(user.id, 'user', data.accessToken, user);
  redirect(next.startsWith('/') ? next : '/');
}

export async function logout(): Promise<void> {
  const s = await getSession();
  if (s?.accessToken) {
    try {
      await backendLogout(s.accessToken);
    } catch {
      // best-effort: local session is cleared regardless
    }
  }
  destroySession();
  redirect('/login');
}
