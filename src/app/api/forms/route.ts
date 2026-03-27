import { NextRequest, NextResponse } from "next/server";
import { FormSchema } from "@/lib/schemas/form";
import { createForm, listForms } from "@/lib/forms-repository";
import { isAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status") ?? undefined;
    const forms = await listForms(status);
    return NextResponse.json(forms);
  } catch (error) {
    console.error("GET /api/forms failed", error);
    const message =
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.message
          : "Unknown server error."
        : "Failed to fetch forms.";
    return NextResponse.json(
      { message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAdmin(request.cookies.get("role")?.value)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

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

    const created = await createForm(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/forms failed", error);
    const message =
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.message
          : "Unknown server error."
        : "Failed to create form.";
    return NextResponse.json(
      { message },
      { status: 500 },
    );
  }
}
