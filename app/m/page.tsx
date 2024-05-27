import { AddBookButton } from "@/modules/home/AddBookButton.mobile";
import { PurchaseOptionCard } from "@/modules/home/PurchaseOptionCard.mobile";
import { Heading, Section } from "@radix-ui/themes";
import { purchaseOptions } from "@/modules/home/PurchaseOptions";
import ShoppingCart from "@/modules/home/ShoppingCart.mobile";

export default function Home() {
  return (
    <main>
      <Section mx="5" py="0">
        <Heading size="6">여러 중고책을 최저가로 구매하는 방법</Heading>
        <Heading size="2" color="gray">
        동일 중고 매장, 배송비를 고려한
        </Heading>
        <Heading size="6">최저가를 알려드릴게요</Heading>

        <Section pt="4" pb="8">
          {purchaseOptions.map((option) => (
            <PurchaseOptionCard key={option.title} 옵션={option.option} 제목={option.title} 설명={option.description} />
          ))}
        </Section>
      </Section>

      <Section mx="5" pt="0">
        <Heading size="6">장바구니</Heading>

        <Section py="4">
          <ShoppingCart />
        </Section>
        <AddBookButton />
      </Section>
    </main>
  );
}
