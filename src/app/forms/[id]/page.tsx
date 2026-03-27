import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { DeleteFormButton } from "@/components/delete-form-button";
import { FormEditor } from "@/components/form-editor";
import { FormRecord } from "@/lib/schemas/form";

const getBaseUrl = async () => {
  const headerList = await headers();
  const host = headerList.get("host");
  const proto = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${proto}://${host}`;
};

export default async function EditFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  if (role !== "admin") {
    redirect("/forms");
  }

  const { id } = await params;
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/forms/${id}`, { cache: "no-store" });
  if (!response.ok) {
    redirect("/forms");
  }
  const form = (await response.json()) as FormRecord;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit form</h1>
        <DeleteFormButton id={id} />
      </div>
      <FormEditor mode="edit" initialData={form} />
    </section>
  );
}
