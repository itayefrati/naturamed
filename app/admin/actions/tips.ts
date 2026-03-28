"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function createTip(formData: FormData) {
  const content = formData.get("content") as string
  const category = formData.get("category") as string

  const { error } = await supabaseAdmin
    .from("daily_tips")
    .insert({ content, category })

  if (error) throw new Error(error.message)

  revalidatePath("/admin/tips")
  revalidatePath("/")
  redirect("/admin/tips")
}

export async function updateTip(formData: FormData) {
  const id = formData.get("id") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string

  const { error } = await supabaseAdmin
    .from("daily_tips")
    .update({ content, category })
    .eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/admin/tips")
  revalidatePath("/")
  redirect("/admin/tips")
}

export async function deleteTip(formData: FormData) {
  const id = formData.get("id") as string
  const { error } = await supabaseAdmin.from("daily_tips").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/tips")
  revalidatePath("/")
}
