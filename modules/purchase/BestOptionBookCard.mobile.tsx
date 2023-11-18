"use client";

import { Box, Card, Flex, Text } from "@radix-ui/themes";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToastStore } from "@/stores/toast";
import { gtagClickUrl } from "@/utils/gtag";

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
  const { open, dispatchToastMsg, dispatchToastOpen, dispatchToastType } = useToastStore((state) => ({
    open: state.open,
    dispatchToastMsg: state.dispatchToastMsg,
    dispatchToastOpen: state.dispatchToastOpen,
    dispatchToastType: state.dispatchToastType,
  }));

  const handleCopyUrl = () => {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = url;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    gtagClickUrl(제목, url);
    if (open) {
      dispatchToastOpen(false);
      dispatchToastMsg("");
      setTimeout(() => {
        dispatchToastOpen(true);
        dispatchToastMsg("링크가 복사되었어요");
        dispatchToastType("general");
      }, 400);
    } else {
      dispatchToastMsg("링크가 복사되었어요");
      dispatchToastOpen(true);
      dispatchToastType("general");
    }
  };

  return (
    <Card key={url} mt="4" size="1">
      <Flex mx="4" gap="1" align="center">
        <img className="Image" src={이미지} width={60} alt="Landscape photograph by Tobias Tullius" />

        <Box mx="4" mr="auto">
          <Text as="div" size="3" weight="bold">
            {제목}
          </Text>
          <Text as="div" size="1">
            판매자: {판매자}
          </Text>
          <Text as="div" size="1">
            가격: {가격}
          </Text>
          <Text as="div" size="1">
            배송비: {배송비}
          </Text>
          <Text as="div" size="1">
            상태: {상태}
          </Text>
          <Text as="div" size="2" color="gray" mt="2">
            {!무료배송비최소금액 ? "무조건 유료 배송" : `${무료배송비최소금액} 이상 구매 시 배송비 무료`}
          </Text>
        </Box>
        <ContentCopyIcon fontSize="medium" onClick={handleCopyUrl} />
      </Flex>
    </Card>
  );
}
