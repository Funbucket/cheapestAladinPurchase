"use client";

import { Box, Card, Flex, Text } from "@radix-ui/themes";

import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { useShoppingCartStore } from "@/stores/book/shoppingCart";
import { useToastStore } from "@/stores/toast";

type Props = {
  옵션: number;
  제목: string;
  설명: string;
};

export function PurchaseOptionCard({ 옵션, 제목, 설명 }: Props) {
  const [uri, setUri] = useState("#");
  const { shoppingCart } = useShoppingCartStore((state) => ({
    shoppingCart: state.books,
  }));

  const { open, dispatchToastMsg, dispatchToastOpen, dispatchToastType } = useToastStore((state) => ({
    open: state.open,
    dispatchToastMsg: state.dispatchToastMsg,
    dispatchToastOpen: state.dispatchToastOpen,
    dispatchToastType: state.dispatchToastType,
  }));

  const handleOptionCardClick = () => {
    if (shoppingCart.length === 0) {
      if (open) {
        dispatchToastOpen(false);
        dispatchToastMsg("");
        setTimeout(() => {
          dispatchToastOpen(true);
          dispatchToastMsg("장바구니가 비어있어요");
          dispatchToastType("warning");
        }, 400);
      } else {
        dispatchToastMsg("장바구니가 비어있어요");
        dispatchToastOpen(true);
        dispatchToastType("warning");
      }
    }
  };

  useEffect(() => {
    if (shoppingCart.length > 0) {
      setUri(`/purchase?option=${옵션}`);
    } else {
      setUri("#");
    }
  }, [shoppingCart]);

  return (
    <Card asChild key={옵션} mt="4" size="1">
      <Link href={uri} onClick={handleOptionCardClick}>
        <Flex mx="4" gap="4" align="center" justify="between">
          <Box>
            <Text as="div" size="3" weight="bold">
              {제목}
            </Text>
            <Text as="div" size="2" weight="bold" color="gray" mt="4">
              {설명}
            </Text>
          </Box>
          <ArrowForwardIosIcon fontSize="medium" />
        </Flex>
      </Link>
    </Card>
  );
}
