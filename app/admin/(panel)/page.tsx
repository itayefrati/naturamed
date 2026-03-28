import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { Leaf, Activity, FlaskConical, Stethoscope, Lightbulb, Plus, Pencil } from "lucide-react"

export const metadata = { title: "Dashboard — NaturaMed Admin" }

async function getCounts() {
  const [herbs, conditions, remedies, symptoms, tips] = await Promise.all([
    supabaseAdmin.from("herbs").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("conditions").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("remedies").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("symptoms").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("daily_tips").select("*", { count: "exact", head: true }),
  ])
  return {
    herbs: herbs.count ?? 0,
    conditions: conditions.count ?? 0,
    remedies: remedies.count ?? 0,
    symptoms: symptoms.count ?? 0,
    tips: tips.count ?? 0,
  }
}

async function getRecentItems() {
  const [herbs, remedies] = await Promise.all([
    supabaseAdmin
      .from("herbs")
      .select("id, name, slug")
      .order("created_at", { ascending: false })
      .limit(5),
    supabaseAdmin
      .from("remedies")
      .select("id, name")
      .order("created_at", { ascending: false })
      .limit(5),
  ])
  return {
    herbs: herbs.data ?? [],
    remedies: remedies.data ?? [],
  }
}

const STAT_CARDS = [
  { key: "herbs" as const, label: "Herbs", icon: Leaf, href: "/admin/herbs" },
  { key: "conditions" as const, label: "Conditions", icon: Activity, href: "/admin/conditions" },
  { key: "remedies" as const, label: "Remedies", icon: FlaskConical, href: "/admin/remedies" },
  { key: "symptoms" as const, label: "Symptoms", icon: Stethoscope, href: "/admin/symptoms" },
  { key: "tips" as const, label: "Daily Tips", icon: Lightbulb, href: "/admin/tips" },
]

const QUICK_ACTIONS = [
  { href: "/admin/herbs/new", label: "Add Herb" },
  { href: "/admin/conditions/new", label: "Add Condition" },
  { href: "/admin/remedies/new", label: "Add Remedy" },
  { href: "/admin/tips/new", label: "Add Tip" },
]

export default async function AdminDashboard() {
  const [counts, recent] = await Promise.all([getCounts(), getRecentItems()])

  return (
    <div className="flex flex-col gap-8 max-w-[1100px]">
      {/* Page header */}
      <div>
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-1"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Overview
        </p>
        <h2 className="font-serif font-semibold text-[28px] text-on-surface">
          Dashboard
        </h2>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, href }) => (
          <Link
            key={key}
            href={href}
            className="rounded-2xl bg-surface-lowest p-6 shadow-ambient border border-outline-variant/20 flex flex-col gap-3 hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <Icon size={20} strokeWidth={1.5} className="text-primary-container" />
            <div>
              <p className="font-serif font-bold text-[40px] text-on-surface leading-none">
                {counts[key]}
              </p>
              <p
                className="text-[12px] font-medium text-on-surface-variant mt-1"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-3">
        <h3
          className="text-[12px] font-semibold uppercase tracking-[0.07rem] text-on-surface-variant"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          {QUICK_ACTIONS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 btn-primary px-5 py-2.5 rounded-full text-[14px] font-semibold"
            >
              <Plus size={14} strokeWidth={2.5} />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Items */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Herbs */}
        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
            <h3 className="font-serif font-semibold text-[16px] text-on-surface">
              Recent Herbs
            </h3>
            <Link
              href="/admin/herbs"
              className="text-[12px] text-primary-container hover:underline"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              View all
            </Link>
          </div>
          <table className="w-full">
            <tbody>
              {recent.herbs.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-[14px] text-on-surface-variant">
                    No herbs yet
                  </td>
                </tr>
              ) : (
                recent.herbs.map((herb) => (
                  <tr key={herb.id} className="border-b border-outline-variant/10 last:border-0">
                    <td className="px-6 py-3 text-[14px] text-on-surface">
                      {herb.name}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Link
                        href={`/admin/herbs/${herb.id}`}
                        className="inline-flex items-center gap-1 text-[12px] text-primary-container hover:underline"
                        style={{ fontFamily: "var(--font-work-sans)" }}
                      >
                        <Pencil size={11} />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Remedies */}
        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
            <h3 className="font-serif font-semibold text-[16px] text-on-surface">
              Recent Remedies
            </h3>
            <Link
              href="/admin/remedies"
              className="text-[12px] text-primary-container hover:underline"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              View all
            </Link>
          </div>
          <table className="w-full">
            <tbody>
              {recent.remedies.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-[14px] text-on-surface-variant">
                    No remedies yet
                  </td>
                </tr>
              ) : (
                recent.remedies.map((remedy) => (
                  <tr key={remedy.id} className="border-b border-outline-variant/10 last:border-0">
                    <td className="px-6 py-3 text-[14px] text-on-surface">
                      {remedy.name}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Link
                        href={`/admin/remedies/${remedy.id}`}
                        className="inline-flex items-center gap-1 text-[12px] text-primary-container hover:underline"
                        style={{ fontFamily: "var(--font-work-sans)" }}
                      >
                        <Pencil size={11} />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
