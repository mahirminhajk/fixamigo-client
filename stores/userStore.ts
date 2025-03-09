"use client"; // ✅ Zustand should be used only in client components

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  phoneNo: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser(user) {
        set({ user });
      },
      clearUser() {
        set({ user: null });
      },
    }),
    {
      name: "user-storage", // ✅ LocalStorage Key
    }
  )
);
