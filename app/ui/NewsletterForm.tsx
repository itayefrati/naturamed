"use client";

export default function NewsletterForm() {
  return (
    <form className="flex gap-3 w-full md:w-auto md:min-w-[380px]" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 px-4 py-3 rounded-lg bg-surface-lowest text-on-surface placeholder:text-outline text-[15px] focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-shadow duration-150"
        style={{ border: "1px solid rgba(191,201,193,0.20)" }}
      />
      <button
        type="submit"
        className="btn-primary px-5 py-3 rounded-lg text-[14px] font-semibold shrink-0"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        Subscribe
      </button>
    </form>
  );
}
