import { Book } from "../book.types";

export interface ShoppingCart {
  books: Book[];
}

export interface ShoppingCartStore extends ShoppingCart {
  dispatchShoppingCartResults: (value: Book[]) => void;
  removeBook: (id: string) => void;
}
