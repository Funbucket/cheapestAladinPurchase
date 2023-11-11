export default function getStatusText(status: string | null): string {
  switch (status) {
    case "0":
      return "전체";
    case "1":
      return "최상";
    case "2":
      return "상";
    case "3":
      return "중";
    default:
      throw new Error("Invalid status value");
  }
}
