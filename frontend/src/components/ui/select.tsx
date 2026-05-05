import * as RadixSelect from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import type { ElementType } from 'react'

interface SelectProps {
  label: string
  icon?: ElementType
  error?: string
  hint?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  options: Array<{
    label: string
    value: string
  }>
  value?: string
  onValueChange?: (value: string) => void
  name?: string
  onBlur?: () => void
}

export function Select({
  label,
  icon: Icon,
  error,
  hint,
  placeholder = 'Selecione uma opção',
  disabled,
  className = '',
  options,
  value,
  onValueChange,
  name,
  onBlur
}: SelectProps) {
  return (
    <div className={`flex flex-col gap-2 group ${className}`}>
      <span
        className={`text-sm transition-colors ${
          error
            ? 'text-danger'
            : 'text-gray-700 group-focus-within:text-brand-base'
        }`}
      >
        {label}
      </span>

      <RadixSelect.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
      >
        <RadixSelect.Trigger
          onBlur={onBlur}
          className={`p-2.5 flex items-center gap-2 rounded-lg border outline-none transition-colors w-full cursor-pointer group/trigger ${
            error ? 'border-danger' : 'border-gray-300 focus:border-brand-base'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-transparent'}`}
        >
          {Icon && (
            <Icon
              className={`size-4 transition-colors ${
                disabled
                  ? 'text-gray-400'
                  : error
                    ? 'text-danger'
                    : value
                      ? 'text-gray-800 group-focus/trigger:text-brand-base'
                      : 'text-gray-400 group-focus/trigger:text-brand-base'
              }`}
            />
          )}

          <RadixSelect.Value placeholder={placeholder}>
            {options.find((opt) => opt.value === value)?.label}
          </RadixSelect.Value>

          <RadixSelect.Icon className="ml-auto">
            <ChevronDownIcon
              className={`size-4 transition-colors ${
                disabled ? 'text-gray-400' : 'text-gray-700'
              }`}
            />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            className="z-50 min-w-(--radix-select-trigger-width) bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden"
          >
            <RadixSelect.Viewport className="p-1">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md outline-none cursor-pointer data-highlighted:bg-brand-base/10 data-highlighted:text-brand-base data-[state=checked]:font-semibold transition-colors"
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator>
                    <CheckIcon className="size-4" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {error ? (
        <span className="text-xs text-danger">{error}</span>
      ) : (
        hint && <span className="text-xs text-gray-500">{hint}</span>
      )}
    </div>
  )
}
