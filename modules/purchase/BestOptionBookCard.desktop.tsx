"use client";

import { Box, Card, Flex, Text } from "@radix-ui/themes";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

type Props = {
  판매자: string;
  제목: string;
  이미지: string;
  가격: number;
  상태: string;
  배송비: number;
  무료배송비최소금액: number;
  url: string;
};

export function BestOptionBookCard({ 판매자, 제목, 이미지, 가격, 상태, 배송비, 무료배송비최소금액, url }: Props) {
  return (
    <Card asChild key={url} mt="4" size="4">
      <Link href={url}>
        <Flex mx="4" gap="3" align="center">
          <img className="Image" src={이미지} width={100} alt="Landscape photograph by Tobias Tullius" />

          <Box mx="4" mr="auto">
            <Text as="div" size="5" weight="bold">
              {제목}
            </Text>
            <Text as="div" size="3">
              판매자: {판매자}
            </Text>
            <Text as="div" size="3">
              가격: {가격}
            </Text>
            <Text as="div" size="3">
              배송비: {배송비}
            </Text>
            <Text as="div" size="3">
              상태: {상태}
            </Text>
            <Text as="div" size="4" color="gray" mt="2">
              {무료배송비최소금액} 이상 구매 시 배송비 무료
            </Text>
          </Box>
          <ArrowForwardIosIcon fontSize="large" />
        </Flex>
      </Link>
    </Card>
  );
}
