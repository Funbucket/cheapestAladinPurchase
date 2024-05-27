import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "책모아 | 책 구매",
  description: "중고책을 저렴하게 모아서 사는 법",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
