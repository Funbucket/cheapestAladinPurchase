export interface Book {
  isbn: string;
  author: string;
  title: string;
  description: string;
  cover: string;
  secondhandCount: number;
}

export interface BookDetail {
  url: string;
  status: "최상" | "상" | "중";
  price: number;
  seller: string;
  deliveryFee: number;
  minDeliveryFee: number;
}

export type BestPurchaseOptionBookDetail = Pick<
  Book & BookDetail,
  "cover" | "url" | "status" | "price" | "seller" | "deliveryFee" | "minDeliveryFee" | "title"
>;
