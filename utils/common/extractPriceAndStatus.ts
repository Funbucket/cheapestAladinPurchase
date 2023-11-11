export default function extractPriceAndStatus(input: string): { price: number; status: "최상" | "상" | "중" } {
  // "판매가 : 숫자원" 형식의 부분을 정규식으로 추출합니다.
  const priceMatch = input.match(/판매가 : (\d+,\d+)원/);

  // "상태 : " 뒤에 오는 문자열을 추출합니다.
  const statusMatch = input.match(/상태 : ([^\s]+)/);

  if (priceMatch && statusMatch) {
    // 가격 문자열에서 쉼표(,)를 제거하고 숫자로 변환합니다.
    const price = parseFloat(priceMatch[1].replace(/,/g, "").replace(",", "."));

    // 상태를 추출합니다.
    const status = statusMatch[1];

    // 추출된 상태가 유효한 값인지 확인합니다.
    if (status === "최상" || status === "상" || status === "중") {
      return { price, status };
    } else {
      throw new Error("유효하지 않은 상태 정보입니다.");
    }
  } else {
    throw new Error("가격 및 상태 정보를 추출할 수 없습니다.");
  }
}
