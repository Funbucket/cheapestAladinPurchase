import { BestPurchaseOptionBookDetail, Book } from "@/stores/book/book.types";

export function concatenateTitles(books: Book[] | BestPurchaseOptionBookDetail[]): string {
  const titles: string[] = books.map((book) => book.title);
  return titles.join(" | ");
}
