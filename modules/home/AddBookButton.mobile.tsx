"use client";

import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

export function AddBookButton() {
  return (
    <Card asChild mt="4" size="1">
      <Link href="/search">
        <Flex align="center" justify="center">
          <Text as="div" size="3" weight="bold">
            책 추가하기
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
