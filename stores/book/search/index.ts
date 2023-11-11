import { create } from "zustand";
import { BookSearch, BookSearchStore } from "./search.types";

const initialState: BookSearch = {
  books: [],
};

export const useBookSearchStore = create<BookSearchStore>((set) => ({
  ...initialState,
  dispatchBookSearchResults: (value) => set({ books: value }),
}));
