"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));
  if (!value) return null;
  return decodeURIComponent(value.split("=")[1] ?? "");
};

export const AppNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const role = readCookie("role");
    setIsLoggedIn(role === "admin" || role === "individual");
  }, []);

  return (
    <header className="border-b border-black/10 bg-white dark:border-white/10 dark:bg-slate-900">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-slate-900 dark:text-slate-100">
          Forms Dashboard
        </Link>
        <div className="flex items-center gap-3 text-sm">
          {isLoggedIn ? (
            <>
              <Link className="rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800" href="/">
                Home
              </Link>
              <Link className="rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800" href="/forms">
                Forms
              </Link>
              <Link
                className="rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <a
                className="rounded bg-slate-900 px-3 py-1 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
                href="/logout"
              >
                Logout
              </a>
            </>
          ) : (
            <Link className="rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800" href="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
