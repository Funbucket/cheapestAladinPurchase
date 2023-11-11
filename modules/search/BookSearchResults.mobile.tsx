"use client";

import { SearchResultBookCard } from "@/modules/search/SearchResultBookCard.mobile";
import { useBookSearchStore } from "@/stores/book/search";

export default function BookSearchResults() {
  const { books } = useBookSearchStore((state) => ({
    books: state.books,
  }));

  return (
    <>
      {books.map((book) => (
        <SearchResultBookCard
          key={book.isbn}
          isbn={book.isbn}
          secondhandCount={book.secondhandCount}
          지은이={book.author}
          제목={book.title}
          설명={book.description}
          이미지={book.cover}
        />
      ))}
    </>
  );
}
