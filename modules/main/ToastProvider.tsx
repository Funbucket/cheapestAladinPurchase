"use client";

import { ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";
import { useToastStore } from "@/stores/toast";
import "./ToastProvider.styles.css";

type Props = {
  children: ReactNode;
};

export function ToastProvider({ children }: Props) {
  const { type, msg, open, dispatchToastOpen } = useToastStore((state) => ({
    type: state.type,
    open: state.open,
    msg: state.msg,
    dispatchToastOpen: state.dispatchToastOpen,
  }));
  return (
    <Toast.Provider swipeDirection="down" duration={1500}>
      {children}
      <Toast.Root
        className={type === "warning" ? "ToastRoot tomato" : "ToastRoot"}
        open={open}
        onOpenChange={dispatchToastOpen}
      >
        <Toast.Title className="ToastTitle">{msg}</Toast.Title>
        <Toast.Action className="ToastAction" asChild altText="Goto schedule to undo">
          <button className={type === "warning" ? "Button small tomato" : "Button small violet"}>닫기</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
}
