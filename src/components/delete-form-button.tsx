"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/toast-store";

type Props = {
  id: string;
};

export const DeleteFormButton = ({ id }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);

  const onDelete = async () => {
    setIsDeleting(true);
    const response = await fetch(`/api/forms/${id}`, { method: "DELETE" });
    if (!response.ok) {
      showToast({ message: "Delete failed.", variant: "error" });
      setIsDeleting(false);
      return;
    }

    showToast({ message: "Form deleted." });
    router.push("/forms");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={isDeleting}
      className="rounded-md border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 disabled:opacity-60"
    >
      {isDeleting ? "Deleting..." : "Delete form"}
    </button>
  );
};
