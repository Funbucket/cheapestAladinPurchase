export default function extractDeliveryFee(input: string): { minDeliveryFee: number | undefined; deliveryFee: number } {
  // 패턴 1: "배송비 : x만원 미만 배송료 y원"
  const pattern1 = /배송비 : (\d+,*\d*)만원 미만 배송료 ([\d,]+)원/;

  // 패턴 2: "배송비 : x원 미만 y원, 반값택배 : z원"
  const pattern2 = /배송비 : (\d+,*\d*)원 미만 ([\d,]+)원, 반값택배 : (\d+,*\d*)원/;

  // 패턴 3: "배송비 : x원 미만 y원"
  const pattern3 = /배송비 : (\d+,*\d*)원 미만 ([\d,]+)원/;

  // 패턴 4: "배송비 : x원"
  const pattern4 = /배송비 : ([\d,]+)원/;

  // 패턴 5: "배송비 : x만원 이상 무료, 그 뒤에 어떤 문자열이 와도 상관없음"
  const pattern5 = /배송비 : (\d+,*\d*)만원 이상 무료(, .*)?/;

  // 패턴 6: "배송비 : 무조건 무료배송"
  const pattern6 = /배송비 : 무조건 무료배송/;

  const match1 = input.match(pattern1);
  if (match1) {
    const minDeliveryFee = parseInt(match1[1]) * 10000;
    const deliveryFee = parseInt(match1[2].replace(",", ""), 10);
    return { minDeliveryFee, deliveryFee };
  }

  const match2 = input.match(pattern2);
  if (match2) {
    const minDeliveryFee = parseInt(match2[1].replace(",", ""), 10);
    const deliveryFee = parseInt(match2[3].replace(",", ""), 10);

    return { minDeliveryFee, deliveryFee };
  }

  const match3 = input.match(pattern3);
  if (match3) {
    const minDeliveryFee = parseInt(match3[1].replace(",", ""), 10);
    const deliveryFee = parseInt(match3[2].replace(",", ""), 10);
    return { minDeliveryFee, deliveryFee };
  }

  const match4 = input.match(pattern4);
  if (match4) {
    const minDeliveryFee = undefined;
    const deliveryFee = parseInt(match4[1].replace(",", ""), 10);
    return { minDeliveryFee, deliveryFee };
  }

  const match5 = input.match(pattern5);
  if (match5) {
    const minDeliveryFee = parseInt(match5[1]) * 10000;
    const deliveryFee = 2500;
    return { minDeliveryFee, deliveryFee };
  }

  const match6 = input.match(pattern6);
  if (match6) {
    const minDeliveryFee = undefined;
    const deliveryFee = 0;
    return { minDeliveryFee, deliveryFee };
  }

  throw new Error(`배송비 정보를 추출할 수 없습니다. Input: ${input}`);
}
