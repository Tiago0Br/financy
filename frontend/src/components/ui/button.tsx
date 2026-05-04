import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ElementType, ReactNode } from 'react'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'w-full p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-brand-base text-white hover:opacity-90',
        danger: 'bg-danger text-white hover:opacity-90',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  icon?: ElementType
  isLoading?: boolean
}

export function Button({
  children,
  icon: Icon,
  isLoading,
  className,
  disabled,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
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
