import { AddBookButton } from "@/modules/home/AddBookButton.desktop";
import { PurchaseOptionCard } from "@/modules/home/PurchaseOptionCard.desktop";
import { Heading, Section } from "@radix-ui/themes";
import { purchaseOptions } from "@/modules/home/PurchaseOptions";
import ShoppingCart from "@/modules/home/ShoppingCart.desktop";

export default function Home() {
  return (
    <main>
      <Section mx="8" pt="8" pb="0">
        <Heading size="8">알라딘 중고 책</Heading>
        <Heading size="4" color="gray">
          동일 중고 매장, 배송비, 배송비 무료 최소금액을 모두 고려한
        </Heading>
        <Heading size="8">최저가를 알려드릴게요</Heading>

        <Section pt="4">
          {purchaseOptions.map((option) => (
            <PurchaseOptionCard key={option.title} 옵션={option.option} 제목={option.title} 설명={option.description} />
          ))}
        </Section>
      </Section>

      <Section mx="8" pt="0">
        <Heading size="8">장바구니</Heading>

        <Section py="4">
          <ShoppingCart />
        </Section>
        <AddBookButton />
      </Section>
    </main>
  );
}
