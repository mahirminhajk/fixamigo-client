import { create } from "zustand";

interface HelpHeaderState {
  helpMessage: string | null;
  setHelpMessage: (msg: string | null) => void;
}

export const useHelpHeaderStore = create<HelpHeaderState>((set) => ({
  helpMessage: null,
  setHelpMessage: (msg) => set({ helpMessage: msg }),
}));
