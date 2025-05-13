"use client";

import Script from "next/script";

export default function WC() {
  return (
    <Script
      id="wc-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(e,n,t,r){var u;var c=o()+"ver="+f(n);a();function i(){var n=document.getElementsByTagName(e)[0];var t=document.createElement(e);t["async"]=true;t.charset="utf-8";t.src=c;n.parentNode.insertBefore(t,n)}function o(){return window.location.protocol=="https:"?"https://work.nethru.co.kr/static/222242/install.js?":"http://work.nethru.co.kr/static/222242/install.js?"}function f(n){var t=(new Date).getTime();var e=n*1e3*60;return n>0?Math.floor(t/e)*e:t}function a(){var n=l();if(!n)return false;n.open("GET",c,true);n.withCredentials=r;n.send(null);n.onload=function(){s();i()};n.onerror=n.onabort=function(){s()};v(function(){n.abort()},t)}function l(){var n;var t=[function(){return new XMLHttpRequest()}];for(var e=0;e<t.length;e++){try{n=t[e]()}catch(r){continue}break}return n}function v(n,t){u=setTimeout(n,t)}function s(){if(u){clearTimeout(u);u=null}}})("script",1440,/*{{timeout}}*/1000,/*{{withCredentials}}*/false);`,
      }}
    ></Script>
  );
}
