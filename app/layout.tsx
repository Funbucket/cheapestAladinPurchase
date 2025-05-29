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
            __html: `(function(f,d,k,h){var b;var a=m()+"ver="+c(d);g();function e(){var o=document.getElementsByTagName(f)[0];var n=document.createElement(f);n.async=true;n.charset="utf-8";n.src=a;o.parentNode.insertBefore(n,o)}function m(){return window.location.protocol=="https:"?"https://work.nethru.co.kr:9443/static/00075/install.js?":"https://61.33.35.148:9443/static/00075/install.js?"}function c(n){var o=new Date().getTime();var p=n*1000*60;return n>0?Math.floor(o/p)*p:o}function g(){var n=l();if(!n){return false}n.open("GET",a,true);n.withCredentials=h;n.send(null);n.onload=function(){j();e()};n.onerror=n.onabort=function(){j()};i(function(){n.abort()},k)}function l(){var q;var o=[function(){return new XDomainRequest()},function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var n=0;n<o.length;n++){try{q=o[n]()}catch(p){continue}break}return q}function i(o,n){b=setTimeout(o,n)}function j(){if(b){clearTimeout(b);b=null}}})("script",0,/*{{timeout}}*/1000,/*{{withCredentials}}*/false);`,
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
