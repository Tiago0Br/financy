import { MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { MenuLink } from '../ui/menu-link'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between py-4 px-6 md:px-12 relative z-50">
      <img
        src="/logo.svg"
        alt="Logo Financy"
        className="w-25 h-8"
        draggable="false"
      />

      <nav className="hidden md:flex flex-1 justify-center gap-4">
        <MenuLink to="/">Dashboard</MenuLink>
        <MenuLink to="/transactions">Transações</MenuLink>
        <MenuLink to="/categories">Categorias</MenuLink>
      </nav>

      <div className="hidden md:flex bg-gray-300 rounded-full size-9 items-center justify-center text-gray-800">
        TL
      </div>

      <button
        type="button"
        className="md:hidden p-1 text-gray-600 focus:outline-none cursor-pointer"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        {isMenuOpen ? (
          <XIcon className="size-7" />
        ) : (
          <MenuIcon className="size-7" />
        )}
      </button>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg flex flex-col p-6 gap-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="bg-gray-300 rounded-full size-10 flex items-center justify-center text-gray-800 font-medium">
              TL
            </div>
            <span className="text-gray-800 font-semibold">Tiago Lopes</span>
          </div>

          <nav className="flex flex-col gap-4">
            <MenuLink to="/" onClick={closeMenu}>
              Dashboard
            </MenuLink>
            <MenuLink to="/transactions" onClick={closeMenu}>
              Transações
            </MenuLink>
            <MenuLink to="/categories" onClick={closeMenu}>
              Categorias
            </MenuLink>
          </nav>
        </div>
      )}
    </header>
  )
}
