"use client";

import { FormEvent, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";
import { ToastContainer } from "@/components/toast-container";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const showToast = useToastStore((state) => state.showToast);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"individual" | "admin">("individual");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setError("Enter a valid email address.");
      return;
    }

    document.cookie = `email=${encodeURIComponent(email)}; path=/; max-age=604800`;
    document.cookie = `role=${role}; path=/; max-age=604800`;
    login({ email, role });
    showToast({ message: "Logged in successfully." });
    window.location.href = "/dashboard";
  };

  return (
    <>
      <ToastContainer />
      <section className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none">
        <h1 className="mb-1 text-xl font-semibold">Login</h1>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Select a role to test protected routes.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:outline-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="role" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value as "individual" | "admin")
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:outline-slate-100"
            >
              <option value="individual">Individual</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
}
