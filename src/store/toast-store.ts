"use client";

import { create } from "zustand";

type ToastVariant = "success" | "error";

type ToastState = {
  message: string;
  variant: ToastVariant;
  isOpen: boolean;
  showToast: (payload: { message: string; variant?: ToastVariant }) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  variant: "success",
  isOpen: false,
  showToast: ({ message, variant = "success" }) =>
    set({ message, variant, isOpen: true }),
  hideToast: () => set({ isOpen: false }),
}));
