"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center rounded-full border border-[#E8F3EB] bg-white shadow-sm overflow-hidden focus-within:border-green-primary focus-within:ring-2 focus-within:ring-[#2D6A4F]/20 transition-all duration-200"
    >
      <div className="relative flex-1 flex items-center">
        <Search
          size={18}
          className="absolute left-5 text-muted pointer-events-none shrink-0"
          strokeWidth={2}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a condition, herb, or symptom..."
          className="w-full pl-12 pr-4 py-4 bg-transparent text-ink placeholder-[#555F5A] text-[16px] font-sans focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 px-7 py-4 bg-green-primary text-white text-[15px] font-semibold hover:bg-[#235a41] transition-colors duration-150 font-sans"
      >
        Search
      </button>
    </form>
  );
}
