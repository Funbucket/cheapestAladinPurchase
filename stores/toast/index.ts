import { create } from "zustand";
import { Toast, ToastStore } from "./toast.types";

const initialState: Toast = {
  msg: "",
  open: false,
  type: "general",
};

export const useToastStore = create<ToastStore>((set) => ({
  ...initialState,
  dispatchToastMsg: (value) => set({ msg: value }),
  dispatchToastOpen: (value) => set({ open: value }),
  dispatchToastType: (value) => set({ type: value }),
}));
