import { BestPurchaseOptionBookDetail } from "../book.types";

export interface BestPurchaseOption {
  combination: BestPurchaseOptionBookDetail[];
  totalPrice: number;
}

export interface BestPurchaseOptionStore extends BestPurchaseOption {
  dispatchCombination: (value: BestPurchaseOptionBookDetail[]) => void;
  dispatchTotalPrice: (value: number) => void;
}
