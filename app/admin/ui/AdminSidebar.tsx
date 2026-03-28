"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Leaf,
  LayoutDashboard,
  Activity,
  FlaskConical,
  Stethoscope,
  GitMerge,
  BookOpen,
  Lightbulb,
  ExternalLink,
} from "lucide-react"

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  exact?: boolean
}

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/herbs", label: "Herbs", icon: Leaf },
      { href: "/admin/conditions", label: "Conditions", icon: Activity },
      { href: "/admin/remedies", label: "Remedies", icon: FlaskConical },
    ],
  },
  {
    label: "Symptom Engine",
    items: [
      { href: "/admin/symptoms", label: "Symptoms", icon: Stethoscope },
      { href: "/admin/mappings", label: "Mappings", icon: GitMerge },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: "/admin/preparations", label: "Prep Methods", icon: BookOpen },
      { href: "/admin/tips", label: "Daily Tips", icon: Lightbulb },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className="w-60 shrink-0 h-screen flex flex-col bg-surface-lowest border-r border-outline-variant/20 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-outline-variant/20">
        <Leaf size={18} strokeWidth={1.5} className="text-primary-container" />
        <div className="flex flex-col">
          <span className="font-serif font-bold text-[16px] text-on-surface leading-none">
            NaturaMed
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.06rem] text-on-surface-variant mt-0.5"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.07rem] text-on-surface-variant px-2 mb-1"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[14px] transition-colors ${
                        active
                          ? "bg-primary/10 text-primary-container font-semibold"
                          : "text-on-surface-variant hover:bg-surface-high hover:text-on-surface"
                      }`}
                      style={{ fontFamily: "var(--font-work-sans)" }}
                    >
                      <item.icon size={16} strokeWidth={1.5} />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-outline-variant/20">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-on-surface-variant hover:bg-surface-high hover:text-on-surface transition-colors"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          <ExternalLink size={14} strokeWidth={1.5} />
          View Site
        </Link>
      </div>
    </aside>
  )
}
