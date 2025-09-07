"use client";

import { useAuthSheetStore } from "@/stores/authSheetStore";

export function useAuthSheet() {
  const openSheet = useAuthSheetStore((s) => s.openSheet);
  const closeSheet = useAuthSheetStore((s) => s.closeSheet);

  return {
    openAuth: (opts?: { onCompleted?: () => void }) => openSheet(opts),
    closeAuth: () => closeSheet(),
  };
}
