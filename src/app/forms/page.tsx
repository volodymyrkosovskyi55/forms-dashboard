import Link from "next/link";
import { cookies, headers } from "next/headers";
import { FormRecord } from "@/lib/schemas/form";

const getBaseUrl = async () => {
  const headerList = await headers();
  const host = headerList.get("host");
  const proto = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${proto}://${host}`;
};

export default async function FormsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const selectedStatus = status ?? "";
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  const isAdmin = role === "admin";
  const baseUrl = await getBaseUrl();
  let forms: FormRecord[] = [];
  let hasLoadError = false;

  try {
    const response = await fetch(
      `${baseUrl}/api/forms${selectedStatus ? `?status=${selectedStatus}` : ""}`,
      {
        cache: "no-store",
      },
    );
    if (!response.ok) {
      hasLoadError = true;
    } else {
      forms = (await response.json()) as FormRecord[];
    }
  } catch {
    hasLoadError = true;
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Forms</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/forms"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            All
          </Link>
          <Link
            href="/forms?status=draft"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            Draft
          </Link>
          <Link
            href="/forms?status=active"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            Active
          </Link>
          <Link
            href="/forms?status=archived"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            Archived
          </Link>
          {isAdmin ? (
            <Link
              href="/forms/new"
              className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
            >
              New form
            </Link>
          ) : null}
        </div>
      </div>

      {hasLoadError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-medium text-amber-800">
            Could not load forms.
          </p>
          <p className="mt-1 text-sm text-amber-700">
            Check your Supabase setup and try again.
          </p>
          <Link
            href="/forms"
            className="mt-3 inline-flex rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700"
          >
            Retry
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Updated At</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.id} className="border-b border-slate-100">
                  <td className="px-4 py-3">{form.title}</td>
                  <td className="px-4 py-3 capitalize">{form.status}</td>
                  <td className="px-4 py-3">
                    {new Date(form.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {isAdmin ? (
                      <Link
                        className="text-sky-700 hover:underline"
                        href={`/forms/${form.id}`}
                      >
                        Edit
                      </Link>
                    ) : (
                      <span className="text-slate-400">Read-only</span>
                    )}
                  </td>
                </tr>
              ))}
              {forms.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                    No forms for the selected filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
