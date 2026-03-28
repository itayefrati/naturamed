"use client";

import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/app/ui/motion/StaggerContainer";
import { CATEGORIES } from "@/lib/categories";

export type { Category } from "@/lib/categories";

export default function CategoryGrid() {
  return (
    <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {CATEGORIES.map((cat) => (
        <StaggerItem key={cat.slug}>
          <Link
            href={`/categories/${cat.slug}`}
            className="group flex flex-col gap-2 rounded-xl bg-surface-lowest px-4 py-5 hover:bg-secondary-container/30 transition-colors duration-200 shadow-ambient h-full"
          >
            <p className="font-semibold text-[13px] text-on-surface group-hover:text-primary-container transition-colors leading-snug">
              {cat.label}
            </p>
            <p className="text-[11px] text-on-surface-variant leading-snug hidden sm:block">
              {cat.description}
            </p>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
