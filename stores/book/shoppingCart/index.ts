import { create } from "zustand";
import { ShoppingCart, ShoppingCartStore } from "./shoppingCart.types";

const initialState: ShoppingCart = {
  books: [],
};

export const useShoppingCartStore = create<ShoppingCartStore>((set) => ({
  ...initialState,
  dispatchShoppingCartResults: (value) => {
    set((state) => {
      const uniqueBooks = value.filter((newBook) => !state.books.some((book) => book.isbn === newBook.isbn));
      return { books: [...state.books, ...uniqueBooks] };
    });
  },
  removeBook: (itemId) => {
    set((state) => {
      const updatedBooks = state.books.filter((book) => book.isbn !== itemId);
      return { books: updatedBooks };
    });
  },
}));
