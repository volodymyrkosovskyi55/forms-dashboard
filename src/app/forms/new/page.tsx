import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormEditor } from "@/components/form-editor";

export default async function NewFormPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  if (role !== "admin") {
    redirect("/forms");
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Create form</h1>
      <FormEditor mode="create" />
    </section>
  );
}
