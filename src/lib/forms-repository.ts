import { FormInput, FormRecord } from "@/lib/schemas/form";
import { getSupabaseAdmin } from "@/lib/supabase";

type FormRow = {
  id: string;
  title: string;
  description: string | null;
  fields_count: number;
  status: "draft" | "active" | "archived";
  created_at: string;
  updated_at: string;
};

const tableName = "forms";

const mapRow = (row: FormRow): FormRecord => ({
  id: row.id,
  title: row.title,
  description: row.description ?? undefined,
  fieldsCount: row.fields_count,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const ensureSeedData = async () => {
  const supabase = getSupabaseAdmin();
  const { count, error: countError } = await supabase
    .from(tableName)
    .select("id", { count: "exact", head: true });

  if (countError) throw countError;

  if ((count ?? 0) > 0) return;

  const now = new Date().toISOString();
  const { error: insertError } = await supabase.from(tableName).insert([
    {
      id: crypto.randomUUID(),
      title: "Student Feedback Survey",
      description: "Collect feedback from students after each semester.",
      fields_count: 12,
      status: "active",
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      title: "Onboarding Checklist",
      description: "New employee onboarding submission form.",
      fields_count: 8,
      status: "draft",
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      title: "Event Registration",
      description: "Archived registration form for yearly conference.",
      fields_count: 20,
      status: "archived",
      created_at: now,
      updated_at: now,
    },
  ]);

  if (insertError) throw insertError;
};

export const listForms = async (status?: string): Promise<FormRecord[]> => {
  await ensureSeedData();
  const supabase = getSupabaseAdmin();
  let query = supabase.from(tableName).select("*").order("updated_at", { ascending: false });

  if (status === "draft" || status === "active" || status === "archived") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((row) => mapRow(row as FormRow));
};

export const getFormById = async (id: string): Promise<FormRecord | null> => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from(tableName).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as FormRow) : null;
};

export const createForm = async (input: FormInput): Promise<FormRecord> => {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from(tableName)
    .insert({
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description ?? null,
      fields_count: input.fieldsCount,
      status: input.status,
      created_at: now,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data as FormRow);
};

export const updateForm = async (
  id: string,
  input: FormInput,
): Promise<FormRecord | null> => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(tableName)
    .update({
      title: input.title,
      description: input.description ?? null,
      fields_count: input.fieldsCount,
      status: input.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) throw error;
  return data ? mapRow(data as FormRow) : null;
};

export const deleteForm = async (id: string): Promise<boolean> => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq("id", id)
    .select("id");

  if (error) throw error;
  return (data?.length ?? 0) > 0;
};
