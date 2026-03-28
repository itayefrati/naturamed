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

export async function createHerb(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const latin_name = formData.get("latin_name") as string
  const family = formData.get("family") as string
  const description = formData.get("description") as string
  const fun_fact = formData.get("fun_fact") as string
  const herb_of_day = formData.get("herb_of_day") === "on"
  const medicinal_properties = parseArray(formData.get("medicinal_properties"))
  const usage_methods = parseArray(formData.get("usage_methods"))
  const precautions = parseArray(formData.get("precautions"))
  const sources = parseArray(formData.get("sources"))

  if (herb_of_day) {
    await supabaseAdmin.from("herbs").update({ herb_of_day: false }).eq("herb_of_day", true)
  }

  const { error } = await supabaseAdmin.from("herbs").insert({
    name,
    slug,
    latin_name,
    family,
    description,
    fun_fact,
    herb_of_day,
    medicinal_properties,
    usage_methods,
    precautions,
    sources,
  })

  if (error) throw new Error(error.message)

  revalidatePath("/admin/herbs")
  revalidatePath("/herbs")
  revalidatePath("/")
  redirect("/admin/herbs")
}

export async function updateHerb(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const latin_name = formData.get("latin_name") as string
  const family = formData.get("family") as string
  const description = formData.get("description") as string
  const fun_fact = formData.get("fun_fact") as string
  const herb_of_day = formData.get("herb_of_day") === "on"
  const medicinal_properties = parseArray(formData.get("medicinal_properties"))
  const usage_methods = parseArray(formData.get("usage_methods"))
  const precautions = parseArray(formData.get("precautions"))
  const sources = parseArray(formData.get("sources"))

  if (herb_of_day) {
    await supabaseAdmin
      .from("herbs")
      .update({ herb_of_day: false })
      .neq("id", id)
      .eq("herb_of_day", true)
  }

  const { error } = await supabaseAdmin
    .from("herbs")
    .update({
      name,
      slug,
      latin_name,
      family,
      description,
      fun_fact,
      herb_of_day,
      medicinal_properties,
      usage_methods,
      precautions,
      sources,
    })
    .eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/admin/herbs")
  revalidatePath(`/herbs/${slug}`)
  revalidatePath("/herbs")
  revalidatePath("/")
  redirect("/admin/herbs")
}

export async function deleteHerb(formData: FormData) {
  const id = formData.get("id") as string
  const { error } = await supabaseAdmin.from("herbs").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/admin/herbs")
  revalidatePath("/herbs")
  revalidatePath("/")
}
