import { AddBookButton } from "@/modules/main/AddBookButton.mobile";
import { PurchaseOptionCard } from "@/modules/main/PurchaseOptionCard.mobile";
import { Heading, Section } from "@radix-ui/themes";
import { purchaseOptions } from "@/modules/main/PurchaseOptions";
import ShoppingCart from "@/modules/main/ShoppingCart.mobile";

export default function Home() {
  return (
    <main>
      <Section mx="5" pt="8" pb="0">
        <Heading size="6">합리적으로 알라딘 중고 책 사기</Heading>

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
