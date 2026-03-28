interface Props {
  label: string
  htmlFor?: string
  description?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export default function FormField({
  label,
  htmlFor,
  description,
  error,
  required,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[13px] font-medium text-on-surface"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        {label}
        {required && <span className="text-primary-container ml-1">*</span>}
      </label>
      {description && (
        <p className="text-[12px] text-on-surface-variant -mt-0.5">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-[12px] text-primary-container">{error}</p>
      )}
    </div>
  )
}
