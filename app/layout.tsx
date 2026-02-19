import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "MrHutch — Premium kraamcadeau creaties",
  description: "Ontwerp emotionele, zachte en luxe baby/kraamcadeau visuals met een warme AI flow."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <ToastProvider>
          <SiteHeader />
          <main className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-16 pt-6 md:px-8">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
