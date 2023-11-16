"use client";

import axios from "axios";
import { useBookSearchStore } from "@/stores/book/search";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { IconButton, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { gtagSearchBooks } from "@/utils/gtag";

type Props = {
  onStart: () => void;
  onFinish: () => void;
};

export function SearchInput({ onStart, onFinish }: Props) {
  const [bookTitle, setBookTitle] = useState("");
  const { dispatchBookSearchResults } = useBookSearchStore((state) => ({
    dispatchBookSearchResults: state.dispatchBookSearchResults,
  }));

  const handleSearchBooks = () => {
    gtagSearchBooks(bookTitle);
    onStart();

    const queryParams = new URLSearchParams({
      ttbkey: `${process.env.NEXT_PUBLIC_ALADIN_API_KEY}`,
      Query: bookTitle,
      QueryType: "Title",
      MaxResults: "10",
      SearchTarget: "Book",
      output: "js",
      Version: "20131101",
      OptResult: "usedLIst",
    });

    const apiUrl = `/aladin/ItemSearch.aspx?${queryParams.toString()}`;
    // const apiUrl = `/aladin/${queryParams.toString()}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        const books = data.item.map((item: any) => ({
          isbn: item.isbn,
          title: item.title,
          author: item.author,
          description: item.description,
          cover: item.cover,
          secondhandCount:
            item.subInfo.usedList.aladinUsed.itemCount +
            item.subInfo.usedList.userUsed.itemCount +
            item.subInfo.usedList.spaceUsed.itemCount,
        }));

        dispatchBookSearchResults(books);
      })
      .catch((error) => {
        console.error("API 요청 중 오류가 발생했습니다.", error);
      })
      .finally(() => {
        onFinish();
      });
  };

  return (
    <TextField.Root size="3">
      <TextField.Input
        placeholder="책 이름을 검색해 주세요"
        value={bookTitle}
        onChange={(e) => {
          setBookTitle(e.target.value);
        }}
      />
      <TextField.Slot>
        <IconButton size="2" variant="ghost" onClick={handleSearchBooks}>
          <MagnifyingGlassIcon height="20" width="20" color="gray" />
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
}
