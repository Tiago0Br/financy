import { MenuLink } from '../ui/menu-link'

export function Header() {
  return (
    <header className="bg-white border border-gray-200 flex items-center py-4 px-12">
      <img
        src="/logo.svg"
        alt="Logo Financy"
        className="w-25 h-8"
        draggable="false"
      />
      <nav className="flex-1 flex justify-center gap-4">
        <MenuLink to="/">Dashboard</MenuLink>
        <MenuLink to="/transactions">Transações</MenuLink>
        <MenuLink to="/categories">Categorias</MenuLink>
      </nav>
      <div className="bg-gray-300 rounded-full size-9 flex items-center justify-center text-gray-800">
        TL
      </div>
    </header>
  )
}
