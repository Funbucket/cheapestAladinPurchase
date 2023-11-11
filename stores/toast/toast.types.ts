export interface Toast {
  msg: string;
  open: boolean;
  type: "general" | "warning";
}

export interface ToastStore extends Toast {
  dispatchToastMsg: (msg: string) => void;
  dispatchToastOpen: (value: boolean) => void;
  dispatchToastType: (value: "general" | "warning") => void;
}
