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
      className="flex w-full items-center rounded-full bg-surface-lowest shadow-ambient-lg overflow-hidden border border-outline-variant/20 focus-within:border-primary-container/30 focus-within:shadow-ambient-lg transition-all duration-200"
    >
      <div className="relative flex-1 flex items-center">
        <Search
          size={17}
          className="absolute left-5 text-outline pointer-events-none shrink-0"
          strokeWidth={1.5}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a condition, herb, or symptom…"
          className="w-full pl-11 pr-4 py-4 bg-transparent text-on-surface placeholder:text-outline text-[15px] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 mr-1.5 my-1.5 px-6 py-2.5 btn-primary rounded-full text-[14px] font-semibold"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        Search
      </button>
    </form>
  );
}
