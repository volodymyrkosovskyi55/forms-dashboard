import type { Metadata } from "next";
import Image from "next/image";
import { HomeCta } from "@/components/home-cta";

export const metadata: Metadata = {
  title: "Forms Dashboard | Home",
  description: "Simple dashboard for creating and managing forms.",
  openGraph: {
    title: "Forms Dashboard",
    description: "Simple dashboard for creating and managing forms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forms Dashboard",
    description: "Simple dashboard for creating and managing forms.",
  },
};

export default function Home() {
  return (
    <section className="grid gap-10 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-2 md:items-center dark:bg-slate-900 dark:shadow-none">
      <div className="space-y-5">
        <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          Forms Dashboard
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Manage forms in one place
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          A small project with role-based access, form validation, and CRUD pages.
        </p>
        <HomeCta />
      </div>
      <div className="relative mx-auto h-64 w-full max-w-md overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        <Image
          src="/globe.svg"
          alt="Forms dashboard illustration"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          priority
          fetchPriority="high"
          className="object-contain p-8"
        />
      </div>
    </section>
  );
}
