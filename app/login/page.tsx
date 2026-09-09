import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { LoginForm } from './login-form';

export default function LoginPage({ searchParams }: { searchParams: { next?: string } }) {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-16 text-ink"
    >
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your account details to continue to VideoTube.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm next={searchParams.next} />
        </CardContent>
      </Card>
      <p className="mt-8 text-sm text-muted-foreground">
        Accounts are managed on your existing server.
      </p>
    </main>
  );
}
