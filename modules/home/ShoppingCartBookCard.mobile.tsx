"use client";

import { useShoppingCartStore } from "@/stores/book/shoppingCart";
import { Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { Delete } from "@mui/icons-material";
import { useToastStore } from "@/stores/toast";

type Props = {
  isbn: string;
  제목: string;
  지은이: string;
  설명: string;
  이미지: string;
};

export function ShoppingCartBookCard({ isbn, 제목, 지은이, 설명, 이미지 }: Props) {
  const { open, dispatchToastMsg, dispatchToastOpen, dispatchToastType } = useToastStore((state) => ({
    open: state.open,
    dispatchToastMsg: state.dispatchToastMsg,
    dispatchToastOpen: state.dispatchToastOpen,
    dispatchToastType: state.dispatchToastType,
  }));

  const { removeBook } = useShoppingCartStore((state) => ({
    removeBook: state.removeBook,
  }));

  return (
    <Card key={제목} mt="4" size="1">
      <Flex mx="4" gap="1" align="center">
        <img className="Image" src={이미지} width={60} alt="Landscape photograph by Tobias Tullius" />

        <Box mx="4">
          <Text as="div" size="2" weight="bold">
            {제목}
          </Text>
          <Text as="div" size="1" mt="2">
            {지은이}
          </Text>
        </Box>

        <IconButton
          ml="auto"
          variant="ghost"
          color="gray"
          size="4"
          onClick={() => {
            if (open) {
              dispatchToastOpen(false);
              dispatchToastMsg("");
              setTimeout(() => {
                dispatchToastOpen(true);
                dispatchToastMsg("장바구니에서 제거!");
                dispatchToastType("general");
              }, 400);
            } else {
              dispatchToastMsg("장바구니에서 제거!");
              dispatchToastOpen(true);
              dispatchToastType("general");
            }
            removeBook(isbn);
          }}
        >
          <Delete fontSize="medium" />
        </IconButton>
      </Flex>
    </Card>
  );
}
