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
  isLogged: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser(user) {
        set({ user });
      },
      clearUser() {
        set({ user: null });
      },
      isLogged() {
        return get().user !== null;
      },
    }),
    {
      name: "user-storage", // ✅ LocalStorage Key
    }
  )
);
