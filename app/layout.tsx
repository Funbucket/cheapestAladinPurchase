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
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "책모아 | 홈",
  description: "중고책을 저렴하게 모아서 사는 법",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="dark-theme">
      <head>
        <Script
          defer
          data-domain="checkmoa.site"
          src="https://action-speak.vercel.app/js/script.js"
        ></Script>
      </head>
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
