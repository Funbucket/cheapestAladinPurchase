"use client";

import { IconButton, Section } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function TopNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <Section
        pb="6"
        pt="6"
        px="4"
        style={{ display: "flex", justifyContent: pathname === "/" ? "flex-end" : "flex-start" }}
      >
        {pathname !== "/" ? (
          <IconButton
            variant="ghost"
            color="gray"
            size="4"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
        ) : (
          <IconButton
            variant="ghost"
            color="gray"
            size="4"
            onClick={() => {
              window.scrollTo(0, document.body.scrollHeight);
            }}
          >
            <ShoppingCartIcon fontSize="medium" />
          </IconButton>
        )}
      </Section>
    </>
  );
}
