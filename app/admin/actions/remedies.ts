"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"

function parseArray(value: FormDataEntryValue | null): string[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value as string)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function createRemedy(formData: FormData) {
  const name = formData.get("name") as string
  const condition_id = formData.get("condition_id") as string
  const prep_time = formData.get("prep_time") as string
  const source = formData.get("source") as string
  const is_curated = formData.get("is_curated") === "on"
  const ingredients = parseArray(formData.get("ingredients"))
  const steps = parseArray(formData.get("steps"))
  const cautions = parseArray(formData.get("cautions"))

  const { error } = await supabaseAdmin.from("remedies").insert({
    name,
    condition_id: condition_id || null,
    prep_time,
    source,
    is_curated,
    ingredients,
    steps,
    cautions,
  })

  if (error) throw new Error(error.message)

  revalidatePath("/admin/remedies")
  revalidatePath("/remedies")
  redirect("/admin/remedies")
}

export async function updateRemedy(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const condition_id = formData.get("condition_id") as string
  const prep_time = formData.get("prep_time") as string
  const source = formData.get("source") as string
  const is_curated = formData.get("is_curated") === "on"
  const ingredients = parseArray(formData.get("ingredients"))
  const steps = parseArray(formData.get("steps"))
  const cautions = parseArray(formData.get("cautions"))

  const { error } = await supabaseAdmin
    .from("remedies")
    .update({
      name,
      condition_id: condition_id || null,
      prep_time,
      source,
      is_curated,
      ingredients,
      steps,
      cautions,
    })
    .eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/admin/remedies")
  revalidatePath("/remedies")
  redirect("/admin/remedies")
}

export async function deleteRemedy(formData: FormData) {
  const id = formData.get("id") as string
  const { error } = await supabaseAdmin.from("remedies").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/remedies")
  revalidatePath("/remedies")
}
