"use client";

import { useShoppingCartStore } from "@/stores/book/shoppingCart";
import { Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";

import { AddShoppingCart } from "@mui/icons-material";
import { useToastStore } from "@/stores/toast";

type Props = {
  isbn: string;
  secondhandCount: number;
  제목: string;
  지은이: string;
  설명: string;
  이미지: string;
};

export function SearchResultBookCard({ isbn, secondhandCount, 제목, 지은이, 설명, 이미지 }: Props) {
  const { open, dispatchToastMsg, dispatchToastOpen, dispatchToastType } = useToastStore((state) => ({
    open: state.open,
    dispatchToastMsg: state.dispatchToastMsg,
    dispatchToastOpen: state.dispatchToastOpen,
    dispatchToastType: state.dispatchToastType,
  }));

  const { books, dispatchShoppingCartResults } = useShoppingCartStore((state) => ({
    books: state.books,
    dispatchShoppingCartResults: state.dispatchShoppingCartResults,
  }));

  const handleAddShoppingCart = () => {
    if (secondhandCount == 0) {
      if (open) {
        dispatchToastOpen(false);
        dispatchToastMsg("");
        setTimeout(() => {
          dispatchToastOpen(true);
          dispatchToastMsg("중고품이 없어요 🥲");
          dispatchToastType("warning");
        }, 400);
      } else {
        dispatchToastMsg("중고품이 없어요 🥲");
        dispatchToastOpen(true);
        dispatchToastType("warning");
      }
    } else {
      if (open) {
        dispatchToastOpen(false);
        dispatchToastMsg("");
        setTimeout(() => {
          dispatchToastOpen(true);
          dispatchToastMsg("장바구니에 추가! 🥳");
          dispatchToastType("general");
        }, 400);
      } else {
        dispatchToastMsg("장바구니에 추가! 🥳");
        dispatchToastOpen(true);
        dispatchToastType("general");
      }
      dispatchShoppingCartResults([
        ...books,
        {
          isbn: isbn,
          secondhandCount: secondhandCount,
          title: 제목,
          author: 지은이,
          description: 설명,
          cover: 이미지,
        },
      ]);
    }
  };
  return (
    <Card key={제목} mt="4" size="4">
      <Flex mx="4" gap="3" align="center">
        <img className="Image" src={이미지} width={100} alt="Landscape photograph by Tobias Tullius" />

        <Box mx="4">
          <Text as="div" size="5" weight="bold">
            {제목}
          </Text>
          <Text as="div" size="3" mt="2">
            {지은이}
          </Text>
          <Text as="div" size="4" color="gray" mt="4">
            {설명}
          </Text>
        </Box>

        <IconButton ml="auto" variant="ghost" color="gray" size="4" onClick={handleAddShoppingCart}>
          <AddShoppingCart fontSize="large" />
        </IconButton>
      </Flex>
    </Card>
  );
}
