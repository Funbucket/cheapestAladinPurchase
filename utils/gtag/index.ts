import { Book } from "@/stores/book/book.types";

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const gtagPageview = (url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  } else {
    console.log({
      event: "pageview",
      page: url,
    });
  }
};

export const gtagShoppingCart = (shoppingCart: Book[]) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "goToViewOptions",
      shoppingCart: shoppingCart,
    });
  } else {
    console.log({
      event: "goToViewOptions",
      shoppingCart: shoppingCart,
    });
  }
};

export const gtagSearchBooks = (bookTitle: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "searchBooks",
      bookTitle: bookTitle,
    });
  } else {
    console.log({
      event: "searchBooks",
      bookTitle: bookTitle,
    });
  }
};
