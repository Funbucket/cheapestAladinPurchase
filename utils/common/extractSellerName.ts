export default function extractSellerName(input: string): string | null {
  const match = input.match(/판매자 : (.+)/);
  return match ? match[1] : null;
}
