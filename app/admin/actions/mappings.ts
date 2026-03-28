"use server"

import { revalidatePath } from "next/cache"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function saveSymptomRemedyMappings(formData: FormData) {
  const symptom_id = formData.get("symptom_id") as string
  let remedy_ids: string[] = []
  try {
    remedy_ids = JSON.parse(formData.get("remedy_ids") as string)
  } catch {
    remedy_ids = []
  }

  // Delete existing mappings for this symptom
  await supabaseAdmin
    .from("symptom_remedies")
    .delete()
    .eq("symptom_id", symptom_id)

  // Insert new mappings
  if (remedy_ids.length > 0) {
    const rows = remedy_ids.map((remedy_id) => ({ symptom_id, remedy_id }))
    const { error } = await supabaseAdmin.from("symptom_remedies").insert(rows)
    if (error) throw new Error(error.message)
  }

  revalidatePath("/admin/mappings")
  revalidatePath("/symptoms")
  revalidatePath("/symptoms/results")
}

export async function saveSymptomHerbMappings(formData: FormData) {
  const symptom_id = formData.get("symptom_id") as string
  let herb_ids: string[] = []
  try {
    herb_ids = JSON.parse(formData.get("herb_ids") as string)
  } catch {
    herb_ids = []
  }

  // Delete existing mappings for this symptom
  await supabaseAdmin
    .from("symptom_herbs")
    .delete()
    .eq("symptom_id", symptom_id)

  // Insert new mappings
  if (herb_ids.length > 0) {
    const rows = herb_ids.map((herb_id) => ({ symptom_id, herb_id }))
    const { error } = await supabaseAdmin.from("symptom_herbs").insert(rows)
    if (error) throw new Error(error.message)
  }

  revalidatePath("/admin/mappings")
  revalidatePath("/symptoms")
  revalidatePath("/symptoms/results")
}
