import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { AnalyzeClient } from "./analyze-client";

export default async function AnalyzePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=Sign in to analyze a post.");
  }

  return <AnalyzeClient />;
}
