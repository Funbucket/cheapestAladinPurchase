export default function extractLastNumber(pageInfo: string): number | null {
  // 입력 문자열에서 숫자 부분을 추출합니다.
  const numberMatch = pageInfo.match(/\d+/g);

  if (numberMatch) {
    // 추출된 숫자 중에서 마지막 숫자를 반환합니다.
    const lastNumber = Number(numberMatch[numberMatch.length - 1]);
    return lastNumber;
  } else {
    // 숫자가 없는 경우 null을 반환합니다.
    return null;
  }
}
