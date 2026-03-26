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
      className="flex w-full items-center rounded-full bg-surface-lowest shadow-ambient overflow-hidden focus-within:ring-2 focus-within:ring-primary-container/20 transition-all duration-200"
    >
      <div className="relative flex-1 flex items-center">
        <Search
          size={18}
          className="absolute left-5 text-on-surface-variant pointer-events-none shrink-0"
          strokeWidth={2}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a condition, herb, or symptom..."
          className="w-full pl-12 pr-4 py-4 bg-transparent text-on-surface placeholder-on-surface-variant text-[16px] font-sans focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 px-7 py-4 btn-primary text-[15px] font-semibold font-sans"
      >
        Search
      </button>
    </form>
  );
}
