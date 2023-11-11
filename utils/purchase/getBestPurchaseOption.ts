import { Book, BestPurchaseOptionBookDetail } from "@/stores/book/book.types";
import axios from "axios";
import { getStatusText } from "../common";

export default async function getBestPurchaseOption(shoppingCart: Book[], minStatus: string | null) {
  const 책마다중고샵: any = [];
  for (const book of shoppingCart) {
    try {
      let page = 1;
      const 중고샵들 = [];
      let isLastPage = false;

      while (!isLastPage) {
        const { shops, nextPage, lastPage } = await fetchSecondShopData(book.isbn, page, minStatus);
        중고샵들.push(...shops);
        if (lastPage) {
          isLastPage = page === lastPage ? true : false;
        } else {
          isLastPage = true;
        }
        page = nextPage;
      }
      책마다중고샵.push(중고샵들);
    } catch (error) {
      console.error(error);
    }
  }

  if (책마다중고샵.some((arr: any) => arr.length === 0)) {
    const status = getStatusText(minStatus);
    throw new Error(`'${status}' 등급의 중고품이 존재하지 않아요...`);
  }

  const { combination, totalPrice } = findMinPriceCombination(책마다중고샵);
  return { combination, totalPrice };
}

async function fetchSecondShopData(isbn: string, page: number, minStatus: string | null) {
  try {
    if (!minStatus) {
      minStatus = "0";
    }
    const response = await axios.get(`/api?id=${isbn}&page=${page}&QualityType=${minStatus}`);
    const data = response.data;
    return {
      shops: data.shops,
      nextPage: data.nextPage,
      lastPage: data.lastPage,
    };
  } catch (error: any) {
    console.error(`Error fetching book data for ISBN ${isbn}: ${error.message}`);
    return {
      shops: [],
      nextPage: null,
      lastPage: true,
    };
  }
}

function findMinPriceCombination(책마다중고샵: BestPurchaseOptionBookDetail[][]): {
  combination: BestPurchaseOptionBookDetail[];
  totalPrice: number;
} {
  const memo: Map<string, { totalPrice: number; combination: BestPurchaseOptionBookDetail[] }> = new Map();

  function calculateTotalPrice(combination: BestPurchaseOptionBookDetail[]): number {
    let totalPrice = 0;
    let sellerToPriceMap = new Map<string, number>();

    for (const product of combination) {
      totalPrice += product.price;

      if (!sellerToPriceMap.has(product.seller)) {
        // console.log("info: ", product.seller, product.price);
        sellerToPriceMap.set(product.seller, product.price);
      } else {
        // console.log("info: ", product.seller, product.price);
        sellerToPriceMap.set(product.seller, sellerToPriceMap.get(product.seller)! + product.price);
      }
    }

    // console.log("combination: ", combination);
    // console.log("option", sellerToPriceMap);

    for (const [seller, price] of sellerToPriceMap) {
      // console.log(
      //   `판매자: ${seller}\n`,
      //   `책 이름: ${combination.find((product) => product.seller === seller)!.title}\n`,
      //   `배달료: ${combination.find((product) => product.seller === seller)!.deliveryFee}\n`,
      //   `최소배달비: ${combination.find((product) => product.seller === seller)!.minDeliveryFee} \n`,
      //   `배달비 무료?: ${price >= combination.find((product) => product.seller === seller)!.minDeliveryFee}\n`,
      //   `가격: ${price}\n`,
      //   `가격 + 배달비: ${price + combination.find((product) => product.seller === seller)!.deliveryFee}`
      // );

      if (
        !combination.find((product) => product.seller === seller)!.minDeliveryFee ||
        price < combination.find((product) => product.seller === seller)!.minDeliveryFee
      ) {
        totalPrice += combination.find((product) => product.seller === seller)!.deliveryFee;
      }
    }

    // console.log("합계", totalPrice);
    return totalPrice;
  }

  function generateCombinations(index: number): { combination: BestPurchaseOptionBookDetail[]; totalPrice: number } {
    const key = currentCombination.map((product) => `${product.title}_${product.seller}`).join(",");

    if (memo.has(key)) {
      return memo.get(key)!;
    }

    if (index === 책마다중고샵.length) {
      const totalPrice = calculateTotalPrice(currentCombination);
      const result = { combination: currentCombination.slice(), totalPrice };

      memo.set(key, result);
      return result;
    }

    let minTotalPrice = Number.MAX_VALUE;
    let minCombination: BestPurchaseOptionBookDetail[] = [];

    for (const product of 책마다중고샵[index]) {
      currentCombination.push(product);
      const { combination, totalPrice } = generateCombinations(index + 1);
      currentCombination.pop();

      if (totalPrice < minTotalPrice) {
        minTotalPrice = totalPrice;
        minCombination = combination;
      }
    }

    const result = { combination: minCombination, totalPrice: minTotalPrice };
    memo.set(key, result);

    return result;
  }

  const currentCombination: BestPurchaseOptionBookDetail[] = [];
  const result = generateCombinations(0);

  // console.log("최소 금액 조합:");
  // console.log(result.combination);
  // console.log("최종 금액:", result.totalPrice);

  return result;
}
