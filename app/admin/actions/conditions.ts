"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"

function parseCauses(value: FormDataEntryValue | null) {
  if (!value) return []
  try {
    return JSON.parse(value as string) as { label: string; description: string }[]
  } catch {
    return []
  }
}

export async function createCondition(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const category = formData.get("category") as string
  const summary = formData.get("summary") as string
  const causes = parseCauses(formData.get("causes"))

  const { data: condition, error } = await supabaseAdmin
    .from("conditions")
    .insert({ name, slug, category, summary })
    .select("id")
    .single()

  if (error) throw new Error(error.message)

  if (causes.length > 0) {
    const { error: causesError } = await supabaseAdmin
      .from("causes")
      .insert(causes.map((c) => ({ ...c, condition_id: condition.id })))
    if (causesError) throw new Error(causesError.message)
  }

  revalidatePath("/admin/conditions")
  revalidatePath("/conditions")
  revalidatePath("/")
  redirect("/admin/conditions")
}

export async function updateCondition(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const category = formData.get("category") as string
  const summary = formData.get("summary") as string
  const causes = parseCauses(formData.get("causes"))

  const { error } = await supabaseAdmin
    .from("conditions")
    .update({ name, slug, category, summary })
    .eq("id", id)

  if (error) throw new Error(error.message)

  // Replace causes: delete existing, insert new
  await supabaseAdmin.from("causes").delete().eq("condition_id", id)
  if (causes.length > 0) {
    const { error: causesError } = await supabaseAdmin
      .from("causes")
      .insert(causes.map((c) => ({ ...c, condition_id: id })))
    if (causesError) throw new Error(causesError.message)
  }

  revalidatePath("/admin/conditions")
  revalidatePath(`/conditions/${slug}`)
  revalidatePath("/conditions")
  redirect("/admin/conditions")
}

export async function deleteCondition(formData: FormData) {
  const id = formData.get("id") as string
  // Causes have condition_id FK — delete them first to avoid FK constraint errors
  await supabaseAdmin.from("causes").delete().eq("condition_id", id)
  const { error } = await supabaseAdmin.from("conditions").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/conditions")
  revalidatePath("/conditions")
}
