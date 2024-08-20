import "~/styles/globals.css";

import type { Metadata } from "next";
import { ReactNode } from "react";
import { ReactQueryProvider } from "~/components/rq-provider";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";
import { SiteHeader } from "~/components/site-header";

export const metadata: Metadata = {
  title: "RQ | showcases",
};

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <ReactQueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
