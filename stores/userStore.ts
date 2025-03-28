"use client"; // ✅ Zustand should be used only in client components

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string | null;
  name: string | null;
  phoneNo: string | null;
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLogged: () => boolean;
}

const INITAL_STATE: User = {
  _id: null,
  name: null,
  phoneNo: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: INITAL_STATE,
      setUser(user) {
        set({ user });
      },
      clearUser() {
        set({ user: INITAL_STATE });
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
