"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const readCookie = (name: string): string | null => {
  const value = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));
  if (!value) return null;
  return decodeURIComponent(value.split("=")[1] ?? "");
};

export const HomeCta = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const role = readCookie("role");
    setIsLoggedIn(role === "admin" || role === "individual");
  }, []);

  if (isLoggedIn) {
    return (
      <Link
        href="/forms"
        className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-100"
      >
        Go to forms
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-100"
    >
      Open login
    </Link>
  );
};
