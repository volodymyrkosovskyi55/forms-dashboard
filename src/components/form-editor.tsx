"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormRecord, FormSchema } from "@/lib/schemas/form";
import { useToastStore } from "@/store/toast-store";
import { ToastContainer } from "@/components/toast-container";

type Props = {
  mode: "create" | "edit";
  initialData?: FormRecord;
};

export const FormEditor = ({ mode, initialData }: Props) => {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      fieldsCount: initialData?.fieldsCount ?? 0,
      status: initialData?.status ?? "draft",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    const endpoint = mode === "create" ? "/api/forms" : `/api/forms/${initialData?.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      showToast({ message: "Save failed.", variant: "error" });
      setIsSubmitting(false);
      return;
    }

    showToast({
      message: mode === "create" ? "Form created." : "Form updated.",
      variant: "success",
    });
    router.push("/forms");
    router.refresh();
  });

  return (
    <>
      <ToastContainer />
      <form onSubmit={onSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            {...register("title")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          {errors.title ? (
            <p className="text-sm text-rose-600">{errors.title.message}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            rows={4}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="fieldsCount" className="text-sm font-medium">
            Fields count
          </label>
          <input
            id="fieldsCount"
            type="number"
            {...register("fieldsCount", { valueAsNumber: true })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          {errors.fieldsCount ? (
            <p className="text-sm text-rose-600">{errors.fieldsCount.message}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
          {errors.status ? (
            <p className="text-sm text-rose-600">{errors.status.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create form"
              : "Save changes"}
        </button>
      </form>
    </>
  );
};
