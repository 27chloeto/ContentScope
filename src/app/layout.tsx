import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "~/components/navbar";
import { createClient } from "~/lib/supabase/server";
import { ThemeProvider } from "./theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ContentScope",
  description:
    "ContentScope analyzes your skincare brand's social posts for audience fit and recommends changes before you publish.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar
            userEmail={user?.email ?? null}
            isAdmin={user?.app_metadata?.role === "admin"}
          />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
