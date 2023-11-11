import { Book } from "../book.types";

export interface BookSearch {
  books: Book[];
}

export interface BookSearchStore extends BookSearch {
  dispatchBookSearchResults: (value: Book[]) => void;
}
