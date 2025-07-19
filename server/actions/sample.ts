"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function addSample(formData: FormData) {
  const id = (formData.get("id") as string)?.trim();

  if (!id) {
    return { error: "Sample ID is required" };
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("sample")
    .insert({ id })
    .single();

  if (error) {
    console.error("Error inserting sample:", error);
    return { error: "Failed to create sample. ID might already exist." };
  }

  revalidatePath("/");
  return { success: true, sample: data };
}

export async function deleteSample(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("sample").delete().eq("id", id);

  if (error) {
    console.error("Error deleting sample:", error);
    return { error: "Failed to delete sample" };
  }

  revalidatePath("/");
  return { success: true };
}
