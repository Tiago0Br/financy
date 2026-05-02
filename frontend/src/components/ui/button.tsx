import type { ComponentProps, ElementType, ReactNode } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
  icon?: ElementType
  isLoading?: boolean
}

export function Button({
  children,
  icon: Icon,
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`w-full p-2 bg-brand-base text-white rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-pulse">Carregando...</span>
      ) : (
        <>
          {Icon && <Icon className="size-4.5" />}
          {children}
        </>
      )}
    </button>
  )
}
