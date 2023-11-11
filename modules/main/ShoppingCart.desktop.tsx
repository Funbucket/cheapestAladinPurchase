"use client";

import { ShoppingCartBookCard } from "@/modules/main/ShoppingCartBookCard.desktop";
import { useShoppingCartStore } from "@/stores/book/shoppingCart";
import { Container, Flex, Text } from "@radix-ui/themes";

export default function ShoppingCart() {
  const { books } = useShoppingCartStore((state) => ({
    books: state.books,
  }));

  return (
    <>
      {books.length === 0 ? (
        <Container my="5">
          <Flex align="center" justify="center">
            <Text as="div" size="4" weight="bold">
              장바구니가 비었어요
            </Text>
          </Flex>
        </Container>
      ) : (
        books.map((book) => (
          <ShoppingCartBookCard
            key={book.isbn}
            isbn={book.isbn}
            지은이={book.author}
            제목={book.title}
            설명={book.description}
            이미지={book.cover}
          />
        ))
      )}
    </>
  );
}
