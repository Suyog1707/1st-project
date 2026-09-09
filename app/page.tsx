import { requireSession } from '@/lib/auth';
import { getCurrentUser, type BackendUser } from '@/lib/backend';
import { LogoutButton } from '@/components/logout-button';
import { Avatar } from '@/components/avatar';
import { Logo } from '@/components/logo';
import { AtSign, Mail, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const session = await requireSession();

  // Fresh proof of identity from the backend, falling back to the session copy.
  let account = session.user ?? null;
  let backendReachable = false;
  try {
    if (session.accessToken) {
      const fresh: BackendUser = await getCurrentUser(session.accessToken);
      if (fresh) {
        account = {
          id: fresh._id,
          username: fresh.username ?? '',
          email: fresh.email ?? '',
          fullName: fresh.fullName ?? '',
          avatar: fresh.avatar?.url,
        };
        backendReachable = true;
      }
    }
  } catch {
    backendReachable = false;
  }

  const name = account?.fullName?.trim() ? account.fullName : 'Your account';
  const username = account?.username ?? '';
  const email = account?.email ?? session.sub;
  const avatarUrl = account?.avatar;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">{email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-6">
        <section className="py-16 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Signed in
          </p>
          <div className="mt-6 flex items-center gap-6">
            <Avatar name={name} src={avatarUrl} className="h-20 w-20 text-2xl" />
            <div>
              <h1 className="font-display text-5xl font-bold tracking-tight">{name}</h1>
              {username ? (
                <p className="mt-2 text-lg text-muted-foreground">@{username}</p>
              ) : null}
            </div>
          </div>
          <p className="mt-6 max-w-prose text-muted-foreground">
            {backendReachable
              ? 'Connected to your account — fetched live from the server.'
              : 'Showing your saved account details. The server could not be reached for a live refresh.'}
          </p>
        </section>

        <section className="pb-24">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-tint p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-[0.15em]">Full name</span>
              </div>
              <p className="mt-3 font-display text-xl font-semibold">{name}</p>
            </div>
            <div className="rounded-lg border border-border bg-tint p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AtSign className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-[0.15em]">Username</span>
              </div>
              <p className="mt-3 font-display text-xl font-semibold">{username || '—'}</p>
            </div>
            <div className="rounded-lg border border-border bg-tint p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-[0.15em]">Email</span>
              </div>
              <p className="mt-3 break-all font-display text-xl font-semibold">{email}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
