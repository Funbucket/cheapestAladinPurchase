"use client";

import { IconButton, Section } from "@radix-ui/themes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname, useRouter } from "next/navigation";

export function TopNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {pathname !== "/" && (
        <Section pb="6" pt="6" pl="4">
          <IconButton
            variant="ghost"
            color="gray"
            size="4"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Section>
      )}
    </>
  );
}
