"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

interface CardHoverProps {
  children: ReactNode
  className?: string
}

export default function CardHover({ children, className }: CardHoverProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        y: -6,
        boxShadow: "0 16px 48px 0 rgba(27, 28, 28, 0.12)",
        transition: { type: "spring", stiffness: 400, damping: 28 },
      }}
      whileTap={{
        y: -2,
        scale: 0.99,
        transition: { type: "spring", stiffness: 500, damping: 35 },
      }}
    >
      {children}
    </motion.div>
  )
}
