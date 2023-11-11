"use client";

import { BestOptionBookCard } from "@/modules/purchase/BestOptionBookCard.desktop";

import { BestPurchaseOptionBookDetail } from "@/stores/book/book.types";

type Props = {
  combination: BestPurchaseOptionBookDetail[];
};
export default function BestOptionResults({ combination }: Props) {
  return (
    <>
      {combination.map((info) => (
        <BestOptionBookCard
          key={info.url}
          판매자={info.seller}
          제목={info.title}
          이미지={info.cover}
          가격={info.price}
          상태={info.status}
          배송비={info.deliveryFee}
          무료배송비최소금액={info.minDeliveryFee}
          url={info.url}
        />
      ))}
    </>
  );
}
