"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export const AuthHydrator = () => {
  const hydrateFromCookies = useAuthStore((state) => state.hydrateFromCookies);

  useEffect(() => {
    hydrateFromCookies();
  }, [hydrateFromCookies]);

  return null;
};
