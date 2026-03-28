"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function createSymptom(formData: FormData) {
  const label = formData.get("label") as string
  const description = formData.get("description") as string

  const { error } = await supabaseAdmin.from("symptoms").insert({ label, description })
  if (error) throw new Error(error.message)

  revalidatePath("/admin/symptoms")
  revalidatePath("/symptoms")
  redirect("/admin/symptoms")
}

export async function updateSymptom(formData: FormData) {
  const id = formData.get("id") as string
  const label = formData.get("label") as string
  const description = formData.get("description") as string

  const { error } = await supabaseAdmin
    .from("symptoms")
    .update({ label, description })
    .eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/admin/symptoms")
  revalidatePath("/symptoms")
  redirect("/admin/symptoms")
}

export async function deleteSymptom(formData: FormData) {
  const id = formData.get("id") as string
  const { error } = await supabaseAdmin.from("symptoms").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/symptoms")
  revalidatePath("/symptoms")
}
