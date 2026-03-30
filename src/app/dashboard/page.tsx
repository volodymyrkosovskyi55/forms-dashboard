import { cookies } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value ?? "individual";
  const email = cookieStore.get("email")?.value ?? "anonymous";

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Logged in as <span className="font-medium">{email}</span> ({role})
      </p>
      <div className="mt-6">
        <Link
          href="/forms"
          className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
        >
          Open forms list
        </Link>
      </div>
    </section>
  );
}
