import { NextRequest, NextResponse } from "next/server";
import { deleteForm, getFormById, updateForm } from "@/lib/forms-repository";
import { FormSchema } from "@/lib/schemas/form";
import { isAdmin } from "@/lib/auth";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const form = await getFormById(id);
    if (!form) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json(form);
  } catch (error) {
    console.error("GET /api/forms/[id] failed", error);
    const message =
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.message
          : "Unknown server error."
        : "Failed to fetch form.";
    return NextResponse.json(
      { message },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!isAdmin(request.cookies.get("role")?.value)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  try {
    const payload = await request.json();
    const parsed = FormSchema.safeParse({
      ...payload,
      fieldsCount: Number(payload.fieldsCount),
    });
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation failed.", errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const updated = await updateForm(id, parsed.data);
    if (!updated) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/forms/[id] failed", error);
    const message =
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.message
          : "Unknown server error."
        : "Failed to update form.";
    return NextResponse.json(
      { message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!isAdmin(request.cookies.get("role")?.value)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  try {
    const deleted = await deleteForm(id);
    if (!deleted) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/forms/[id] failed", error);
    const message =
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.message
          : "Unknown server error."
        : "Failed to delete form.";
    return NextResponse.json(
      { message },
      { status: 500 },
    );
  }
}
