import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "싸다알라딘 | 책 구매",
  description: "합리적인 알라딘 중고 책 구매",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
