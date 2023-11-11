"use client";

import { Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { SearchInput } from "@/modules/search/SearchInput.desktop";
import BookSearchResults from "@/modules/search/BookSearchResults.desktop";
import { Loading } from "@/assets/lotties";
import Lottie from "lottie-react";

import { useState } from "react";
import { useBookSearchStore } from "@/stores/book/search";

export default function Search() {
  const { books } = useBookSearchStore((state) => ({
    books: state.books,
  }));
  const [searching, setSearching] = useState(false);

  const handleSearchStart = () => {
    setSearching(true);
  };

  const handleSearchFinish = () => {
    setSearching(false);
  };

  return (
    <main>
      <Section mx="8" py="0">
        <Section pt="0" pb="8">
          <SearchInput onStart={handleSearchStart} onFinish={handleSearchFinish} />
        </Section>
      </Section>

      <Section mx="8" pt="0">
        {books.length > 0 && <Heading size="8">구매하려는 책을 담아주세요</Heading>}

        <Section pt="3" pb="5">
          {searching ? (
            <Container mt="9">
              <Flex justify="center" direction="column" align="center">
                <Text mb="7" size="4" weight="bold">
                  책을 검색하고 있어요
                </Text>
                <Lottie animationData={Loading} />
              </Flex>
            </Container>
          ) : (
            <BookSearchResults />
          )}
        </Section>
      </Section>
    </main>
  );
}
