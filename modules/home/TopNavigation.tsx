"use client";

import { Flex, IconButton, Section } from "@radix-ui/themes";
import { usePathname, useRouter, useSelectedLayoutSegments } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function TopNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  let fontSize: "large" | "medium" = "large";
  let px: "4" | "8" = "8";
  const selectedLayoutSegments = useSelectedLayoutSegments();
  if (selectedLayoutSegments.some((segment) => segment === "m")) {
    fontSize = "medium"; // 모바일이면 크기를 medium으로 변경
    px = "4";
  }

  return (
    <>
      <Section pb="6" pt="6" px={px}>
        {/* <Flex justify={pathname === "/" ? "end" : "start"}> */}
        {pathname !== "/" && (
          <IconButton
            variant="ghost"
            color="gray"
            size="4"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBackIcon fontSize={fontSize} />
          </IconButton>
        )}

        {/* </Flex> */}
      </Section>
    </>
  );
}
