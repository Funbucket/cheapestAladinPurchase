import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "@/app/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ToastProvider } from "@/modules/home/ToastProvider";
import { TopNavigation } from "@/modules/home/TopNavigation";
import GTM from "@/modules/GTM";
import { Suspense } from "react";
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
          id="actionspeak"
          src="https://actionspeak.kr/js/script.js"
          data-domain="checkmoa.site"
          strategy="beforeInteractive"
        />
        <Script
          id="wc-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(e,n,t,r){var u;var c=o()+"ver="+f(n);a();function i(){var n=document.getElementsByTagName(e)[0];var t=document.createElement(e);t["async"]=true;t.charset="utf-8";t.src=c;n.parentNode.insertBefore(t,n)}function o(){return window.location.protocol=="https:"?"https://work.nethru.co.kr/static/222242/install.js?":"http://work.nethru.co.kr/static/222242/install.js?"}function f(n){var t=(new Date).getTime();var e=n*1e3*60;return n>0?Math.floor(t/e)*e:t}function a(){var n=l();if(!n)return false;n.open("GET",c,true);n.withCredentials=r;n.send(null);n.onload=function(){s();i()};n.onerror=n.onabort=function(){s()};v(function(){n.abort()},t)}function l(){var n;var t=[function(){return new XMLHttpRequest()}];for(var e=0;e<t.length;e++){try{n=t[e]()}catch(r){continue}break}return n}function v(n,t){u=setTimeout(n,t)}function s(){if(u){clearTimeout(u);u=null}}})("script",0,/*{{timeout}}*/1000,/*{{withCredentials}}*/false);`,
          }}
        />
      </head>
      <body className={`${inter.className} dark`}>
        <Suspense>
          <GTM />
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
