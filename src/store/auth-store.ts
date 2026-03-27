"use client";

import { create } from "zustand";
import { UserRole } from "@/lib/auth";

type AuthState = {
  email: string;
  role: UserRole | null;
  login: (payload: { email: string; role: UserRole }) => void;
  logout: () => void;
  hydrateFromCookies: () => void;
};

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const all = document.cookie
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${name}=`));
  if (!all) return null;
  return decodeURIComponent(all.split("=")[1] ?? "");
};

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  role: null,
  login: ({ email, role }) => set({ email, role }),
  logout: () => set({ email: "", role: null }),
  hydrateFromCookies: () => {
    const role = readCookie("role");
    const email = readCookie("email");
    if (role === "admin" || role === "individual") {
      set({ role, email: email ?? "" });
    } else {
      set({ role: null, email: "" });
    }
  },
}));
