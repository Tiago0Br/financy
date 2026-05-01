import type { ComponentProps, ElementType } from 'react'

interface InputProps extends ComponentProps<'input'> {
  label: string
  icon: ElementType
  error?: string
  isFilled?: boolean
}

export function Input({
  label,
  icon: Icon,
  error,
  isFilled = false,
  id,
  disabled,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col gap-2 group ${className}`}>
      <label
        htmlFor={id}
        className={`text-sm transition-colors ${
          error
            ? 'text-danger'
            : 'text-gray-700 group-focus-within:text-brand-base'
        }`}
      >
        {label}
      </label>

      <div
        className={`p-2.5 flex items-center gap-2 rounded-lg border transition-colors ${
          error
            ? 'border-danger'
            : 'border-gray-300 group-focus-within:border-brand-base'
        }`}
      >
        <Icon
          className={`size-4 transition-colors ${
            disabled
              ? 'text-gray-400'
              : error
                ? 'text-danger'
                : isFilled
                  ? 'text-gray-800 group-focus-within:text-brand-base'
                  : 'text-gray-400 group-focus-within:text-brand-base'
          }`}
        />

        <input
          id={id}
          disabled={disabled}
          className={`flex-1 placeholder:text-gray-400 outline-none transition-colors bg-transparent ${
            disabled ? 'text-gray-400' : 'text-gray-800'
          }`}
          {...props}
        />
      </div>

      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  )
}
