import { Link, type LinkProps } from '@tanstack/react-router'

interface MenuLinkProps extends LinkProps {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export function MenuLink({ children, to, ...props }: MenuLinkProps) {
  return (
    <Link
      to={to}
      activeProps={{ className: 'text-brand-base' }}
      inactiveProps={{ className: 'text-gray-600' }}
      activeOptions={{ exact: true }}
      className="text-sm font-semibold hover:text-brand-base hover:underline"
      {...props}
    >
      {children}
    </Link>
  )
}
