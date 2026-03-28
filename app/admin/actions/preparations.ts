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

export async function createPreparationMethod(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const steps = parseArray(formData.get("steps"))
  const use_cases = parseArray(formData.get("use_cases"))

  const { error } = await supabaseAdmin
    .from("preparation_methods")
    .insert({ name, description, steps, use_cases })

  if (error) throw new Error(error.message)

  revalidatePath("/admin/preparations")
  revalidatePath("/preparations")
  redirect("/admin/preparations")
}

export async function updatePreparationMethod(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const steps = parseArray(formData.get("steps"))
  const use_cases = parseArray(formData.get("use_cases"))

  const { error } = await supabaseAdmin
    .from("preparation_methods")
    .update({ name, description, steps, use_cases })
    .eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/admin/preparations")
  revalidatePath("/preparations")
  redirect("/admin/preparations")
}

export async function deletePreparationMethod(formData: FormData) {
  const id = formData.get("id") as string
  const { error } = await supabaseAdmin
    .from("preparation_methods")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/admin/preparations")
  revalidatePath("/preparations")
}
