"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/app/ui/Navbar"
import EntryModal from "@/app/ui/EntryModal"

export default function ConditionalNav() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null
  return (
    <>
      <Navbar />
      <EntryModal />
    </>
  )
}
