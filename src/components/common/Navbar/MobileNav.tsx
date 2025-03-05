import { Link, NavLink, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { User, LogOut, ArrowRight } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/features/auth/stores/authStore'

interface MobileNavProps {
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
  getInitials: (username?: string) => string
}

export function MobileNav({
  isMobileMenuOpen,
  toggleMobileMenu,
  getInitials,
}: MobileNavProps) {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div
      className={`md:hidden bg-white shadow-md ${
        isMobileMenuOpen ? '' : 'hidden'
      }`}
    >
      <ul className="px-4 py-2 space-y-3">
        <li>
          <NavLink
            to="/"
            className="block py-2 text-gray-dark hover:text-purple-primary"
            onClick={toggleMobileMenu}
          >
            Início
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ranking"
            className="block py-2 text-gray-dark hover:text-purple-primary"
            onClick={toggleMobileMenu}
          >
            Ranking
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/como-funciona"
            className="block py-2 text-gray-dark hover:text-purple-primary"
            onClick={toggleMobileMenu}
          >
            Como Funciona
          </NavLink>
        </li>
        <li className="pt-2 border-t border-gray-light">
          {isAuthenticated ? (
            <div className="py-2">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-primary text-white">
                    {getInitials(user?.username)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-dark">{user?.username}</span>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full text-gray-dark border-gray-light hover:bg-gray-100 flex items-center justify-center"
                  onClick={() => {
                    navigate('/perfil')
                    toggleMobileMenu()
                  }}
                >
                  <User size={16} className="mr-2" />
                  Perfil
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-purple-primary border-purple-primary hover:bg-purple-primary/5 flex items-center justify-center"
                  onClick={() => {
                    handleLogout()
                    toggleMobileMenu()
                  }}
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 font-inter bg-purple-primary text-white hover:bg-purple-dark w-full"
              onClick={toggleMobileMenu}
            >
              Acessar <ArrowRight size={16} />
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}
