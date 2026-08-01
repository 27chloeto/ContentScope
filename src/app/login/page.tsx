import Link from "next/link";
import { GoogleSignInButton } from "~/components/google-signin-button";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-sm flex-col gap-8 px-4 py-16">
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          Welcome back
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
      </div>

      <GoogleSignInButton />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form action={login} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" size="lg" className="self-start">
          Sign in
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}
