import { Link, type LinkProps } from '@tanstack/react-router'
import type { ElementType, ReactNode } from 'react'

interface LinkButtonProps extends LinkProps {
  children: ReactNode
  icon: ElementType
  isLoading?: boolean
}

export function LinkButton({
  children,
  icon: Icon,
  isLoading,
  to,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      className="w-full rounded-md border border-gray-300 cursor-pointer py-2 flex justify-center items-center gap-2 text-gray-700"
      {...props}
    >
      <Icon className="size-4.5" />
      {children}
    </Link>
  )
}
