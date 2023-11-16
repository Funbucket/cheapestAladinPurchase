import { BestPurchaseOptionBookDetail, Book } from "@/stores/book/book.types";
import { concatenateTitles } from "./concatenateTitles";

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
      shoppingCart: concatenateTitles(shoppingCart),
    });
  } else {
    console.log({
      event: "goToViewOptions",
      shoppingCart: concatenateTitles(shoppingCart),
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

export const gtagCheapestOption = (combination: BestPurchaseOptionBookDetail[], totalPrice: number) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "cheapestOption",
      option: concatenateTitles(combination),
      totalPrice: totalPrice,
    });
  } else {
    console.log({
      event: "cheapestOption",
      option: concatenateTitles(combination),
      totalPrice: totalPrice,
    });
  }
};

export const gtagClickUrl = (bookTitle: string, url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "clickOptionUrl",
      bookTitle: bookTitle,
      url: url,
    });
  } else {
    console.log({
      event: "clickOptionUrl",
      bookTitle: bookTitle,
      url: url,
    });
  }
};
