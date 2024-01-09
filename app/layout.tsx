import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "@/app/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ToastProvider } from "@/modules/home/ToastProvider";
import { TopNavigation } from "@/modules/home/TopNavigation";
import GTM from "@/modules/GTM";
import { Suspense } from "react";
import WC from "@/modules/WC";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "싸다알라딘 | 홈",
  description: "합리적인 알라딘 중고 책 구매",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className="dark-theme">
      <body className={`${inter.className} dark`}>
        <Suspense>
          <GTM />
          <WC />
        </Suspense>
        <Theme appearance="dark">
          <ToastProvider>
            <TopNavigation />
            {children}
          </ToastProvider>
        </Theme>
      </body>
    </html>
  );
}
