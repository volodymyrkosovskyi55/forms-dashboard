"use client";

import { useEffect } from "react";
import { useToastStore } from "@/store/toast-store";

export const ToastContainer = () => {
  const { isOpen, message, variant, hideToast } = useToastStore((state) => state);

  useEffect(() => {
    if (!isOpen) return;
    const timeoutId = window.setTimeout(() => hideToast(), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [hideToast, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      aria-live="polite"
      className={`fixed right-4 top-4 z-50 rounded-md px-4 py-3 text-sm shadow-lg ${
        variant === "success"
          ? "bg-emerald-600 text-white"
          : "bg-rose-600 text-white"
      }`}
    >
      {message}
    </div>
  );
};
