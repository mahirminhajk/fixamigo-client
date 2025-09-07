"use client";
import { Sheet } from "@/components/ui/sheet";
import UserRegSheet from "@/components/sheets/userRegSheet";
import { useAuthSheetStore } from "@/stores/authSheetStore";
import { useEffect } from "react";
import { OPEN_AUTH_SHEET_EVENT, AUTH_COMPLETED_EVENT } from "@/lib/authEvents";

export default function AuthSheetProvider() {
  const open = useAuthSheetStore((s) => s.open);
  const closeSheet = useAuthSheetStore((s) => s.closeSheet);
  const onCompleted = useAuthSheetStore((s) => s.onCompleted);
  const openSheet = useAuthSheetStore((s) => s.openSheet);

  const handleCompleted = () => {
    // invoke caller's callback once
    try {
      onCompleted?.();
    } finally {
      closeSheet();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(AUTH_COMPLETED_EVENT));
      }
    }
  };

  // Open sheet on global 401 event
  useEffect(() => {
    const handler = () => openSheet();
    window.addEventListener(OPEN_AUTH_SHEET_EVENT, handler);
    return () => window.removeEventListener(OPEN_AUTH_SHEET_EVENT, handler);
  }, [openSheet]);

  return (
    <Sheet open={open} onOpenChange={(o) => (!o ? closeSheet() : undefined)}>
      <UserRegSheet onCompleted={handleCompleted} />
    </Sheet>
  );
}
