import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import AdminSidebar from "@/app/admin/ui/AdminSidebar"
import AdminHeader from "@/app/admin/ui/AdminHeader"

// Page title map — sidebar sets active state, layout supplies the header title
// We derive the title from the path in the page components instead of here,
// so we pass it from each page via a prop. For the layout we keep a generic
// fallback and let each page override via <title> metadata.

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader title="Admin" userEmail={user.email} />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  )
}
