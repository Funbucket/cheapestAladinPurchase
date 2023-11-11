"use client";

import { Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { SearchInput } from "@/modules/search/SearchInput.mobile";
import { useState } from "react";
import Lottie from "lottie-react";
import { Loading } from "@/assets/lotties";
import { useBookSearchStore } from "@/stores/book/search";
import BookSearchResults from "@/modules/search/BookSearchResults.mobile";

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
      <Section mx="5" py="0">
        <Section pt="0" pb="8">
          <SearchInput onStart={handleSearchStart} onFinish={handleSearchFinish} />
        </Section>
      </Section>

      <Section mx="5" pt="0">
        {books.length > 0 && <Heading size="6">구매하려는 책을 담아주세요</Heading>}

        <Section pt="3" pb="5">
          {searching ? (
            <Container mt="9">
              <Flex justify="center" direction="column" align="center">
                <Text mb="7" size="3" weight="bold">
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
