import { redirect } from "next/navigation";
import { createAdminClient } from "~/lib/supabase/admin";
import { createClient } from "~/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=Sign in to access the admin page.");
  }

  if (user.app_metadata?.role !== "admin") {
    redirect("/");
  }

  const admin = createAdminClient();
  const {
    data: { users },
    error,
  } = await admin.auth.admin.listUsers();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16">
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          Admin
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
      </div>

      {error && <p className="text-sm text-destructive">{error.message}</p>}

      {!error && (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-muted-foreground">
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 font-medium">Provider</th>
                <th className="px-4 py-2 font-medium">Created</th>
                <th className="px-4 py-2 font-medium">Last sign in</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {u.app_metadata?.provider ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {u.last_sign_in_at
                      ? new Date(u.last_sign_in_at).toLocaleDateString()
                      : "Never"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
