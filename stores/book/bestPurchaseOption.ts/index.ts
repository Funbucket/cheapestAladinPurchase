import { create } from "zustand";
import { BestPurchaseOption, BestPurchaseOptionStore } from "./bestPurchaseOption.types";

const initialState: BestPurchaseOption = {
  combination: [],
  totalPrice: 0,
};

export const useBestPurchaseOptionStore = create<BestPurchaseOptionStore>((set) => ({
  ...initialState,
  dispatchCombination: (value) => set({ combination: value }),
  dispatchTotalPrice: (value) => set({ totalPrice: value }),
}));
