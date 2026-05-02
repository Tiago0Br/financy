import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { type ComponentProps, type ElementType, useState } from 'react'

interface InputProps extends ComponentProps<'input'> {
  label: string
  icon?: ElementType
  error?: string
  hint?: string
  isFilled?: boolean
}

export function Input({
  label,
  icon: Icon,
  error,
  hint,
  isFilled = false,
  id,
  disabled,
  type,
  className = '',
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && isPasswordVisible ? 'text' : type

  function handleTogglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev)
  }

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
        {Icon && (
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
        )}

        <input
          id={id}
          disabled={disabled}
          type={inputType}
          className={`flex-1 placeholder:text-gray-400 outline-none transition-colors bg-transparent ${
            disabled ? 'text-gray-400' : 'text-gray-800'
          }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            disabled={disabled}
          >
            {isPasswordVisible ? (
              <EyeIcon className="size-4 text-gray-700 cursor-pointer" />
            ) : (
              <EyeClosedIcon className="size-4 text-gray-700 cursor-pointer" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <span className="text-xs text-danger">{error}</span>
      ) : (
        hint && <span className="text-xs text-gray-500">{hint}</span>
      )}
    </div>
  )
}
