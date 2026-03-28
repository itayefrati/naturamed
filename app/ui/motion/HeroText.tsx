"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

interface HeroTextProps {
  children: ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "div"
  delay?: number
}

export default function HeroText({
  children,
  className,
  as: Tag = "div",
  delay = 0.15,
}: HeroTextProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0.2 : 0.65,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
