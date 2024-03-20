"use client";

import { Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useShoppingCartStore } from "@/stores/book/shoppingCart";
import { getBestPurchaseOption } from "@/utils/purchase";

import { useEffect, useState } from "react";
import { BestPurchaseOptionBookDetail } from "@/stores/book/book.types";
import Lottie from "lottie-react";
import { Loading } from "@/assets/lotties";
import BestOptionResults from "@/modules/purchase/BestOptionResults.mobile";
import { gtagCheapestOption } from "@/utils/gtag";

export default function Purchase() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusOption = searchParams.get("option");
  const { shoppingCart } = useShoppingCartStore((state) => ({
    shoppingCart: state.books,
  }));

  const [bestOption, setBestOption] = useState<{
    combination: BestPurchaseOptionBookDetail[];
    totalPrice: number;
  }>({
    combination: [],
    totalPrice: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getBestPurchaseOption(shoppingCart, statusOption);
        gtagCheapestOption(result.combination, result.totalPrice);
        setBestOption({ combination: result.combination, totalPrice: result.totalPrice });
      } catch (error) {
        console.error(error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    console.log(shoppingCart);
    if (shoppingCart.length > 0) {
      fetchData();
    } else {
      router.push("/");
    }
  }, [shoppingCart, statusOption]);

  return (
    <main>
      <Section mx="5" py="0" pb="0">
        {loading ? (
          <Container mt="9">
            <Flex justify="center" direction="column" align="center">
              <Text mb="7" size="3" weight="bold">
                최적의 금액을 찾고 있어요
              </Text>
              <Text mb="7" size="2" weight="bold" color="gray">
                조금만 기다려 주시면 최적의 옵션을 알려드려요 🤗
              </Text>
              <div style={{ width: "150px" }}>
                <Lottie animationData={Loading} />
              </div>
            </Flex>
          </Container>
        ) : (
          <>
            {error ? (
              <Container mt="9">
                <Flex justify="center" direction="column" align="center">
                  <Text mb="7" size="4" weight="bold">
                    {error}
                  </Text>
                </Flex>
              </Container>
            ) : (
              <>
                <Heading size="6" id="total-price">
                  총 {bestOption.totalPrice} 원
                </Heading>
                <Heading size="2" color="gray">
                  복사한 링크에서 최저가를 구매해 보세요
                </Heading>
                <Section pt="4">
                  <BestOptionResults combination={bestOption.combination} />
                </Section>
              </>
            )}
          </>
        )}
      </Section>
    </main>
  );
}
