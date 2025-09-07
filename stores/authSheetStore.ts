"use client";

import { create } from "zustand";

type OnCompleted = (() => void) | undefined;

interface AuthSheetState {
  open: boolean;
  onCompleted?: () => void;
  // open the sheet and optionally set a one-time completion callback
  openSheet: (opts?: { onCompleted?: () => void }) => void;
  // close the sheet
  closeSheet: () => void;
  // internal: set completion handler
  setOnCompleted: (cb?: () => void) => void;
}

export const useAuthSheetStore = create<AuthSheetState>((set) => ({
  open: false,
  onCompleted: undefined,
  openSheet: (opts?: { onCompleted?: () => void }) =>
    set(() => ({ open: true, onCompleted: opts?.onCompleted })),
  closeSheet: () => set(() => ({ open: false })),
  setOnCompleted: (cb?: OnCompleted) => set(() => ({ onCompleted: cb })),
}));
