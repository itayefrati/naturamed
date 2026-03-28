"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "left" | "right"
  distance?: number
  className?: string
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  className,
}: ScrollRevealProps) {
  const reduced = useReducedMotion()

  const initial = reduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? distance : 0,
        x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      }

  const animate = { opacity: 1, y: 0, x: 0 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduced ? 0.2 : 0.5,
        delay: reduced ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
