import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import { BestPurchaseOptionBookDetail } from "@/stores/book/book.types";
import {
  extractDeliveryFee,
  extractLastNumber,
  extractPriceAndStatus,
  extractSellerName,
  extractUrlFromLoactionHref,
} from "@/utils/common";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const isbn = searchParams.get("id");
  const page = searchParams.get("page");
  const qualityType = searchParams.get("QualityType");
  const nextPage = Number(page) + 1;
  const target = `https://www.aladin.co.kr/m/museditemall.aspx?isbn=${isbn}&tabtype=0&fix=1&page=${page}&QualityType=${qualityType}`;

  try {
    const html = await axios.get(target);
    const $ = cheerio.load(html.data);
    const shops: Partial<BestPurchaseOptionBookDetail>[] = [];
    const bookUlSelector = $(".pdp_used_listwrap .pdp_used_list .area1 ul");
    const title = $(".pdp_header_info h2 a").text();
    const lastPage = extractLastNumber($(".pg").text());
    const cover = "https:" + $(".prodImage_size img").attr("src");

    bookUlSelector.map(async (idx, el) => {
      const seller = extractSellerName($(el).find("li:nth-child(2)").text()) as string;
      const priceAndStatus = $(el).find("li:nth-child(3)").text();
      const { price, status } = extractPriceAndStatus(priceAndStatus);
      const deliveryInfo = $(el).find("li:nth-child(4)").text();

      const url = extractUrlFromLoactionHref($(el).attr("onclick") as string);

      const { minDeliveryFee, deliveryFee } = extractDeliveryFee(deliveryInfo);
      console.log(
        "deliveryInfo: " + deliveryInfo + " / minDeliveryFee: " + minDeliveryFee + " / deliveryFee: " + deliveryFee
      );
      shops[idx] = {
        title,
        seller,
        price,
        status,
        minDeliveryFee,
        deliveryFee,
        url,
        cover,
      };
    });

    return NextResponse.json({ shops, nextPage, lastPage });
  } catch (e) {
    console.log(e, target);

    return new Response("Internal Server Error", { status: 500 });
  }
}
