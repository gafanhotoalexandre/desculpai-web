import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { Button } from '@/components/ui/button'
import { Menu, ArrowRight, User, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function Navbar() {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getInitials = (username?: string) => {
    return username?.substring(0, 2).toUpperCase() || 'U'
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-poppins font-bold text-2xl md:text-3xl">
          desculp<span className="text-purple-primary">.ai</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-dark"
          aria-label="Toggle mobile menu"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className="text-gray-dark hover:text-purple-primary transition-colors duration-200"
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                to="/ranking"
                className="text-gray-dark hover:text-purple-primary transition-colors duration-200"
              >
                Ranking
              </Link>
            </li>
            <li>
              <Link
                to="/como-funciona"
                className="text-gray-dark hover:text-purple-primary transition-colors duration-200"
              >
                Como Funciona
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-primary text-white">
                      {getInitials(user?.username)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-dark">{user?.username}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/perfil')}>
                  <User size={16} className="mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1 px-4 py-2 rounded-md font-medium transition-colors duration-200 font-inter bg-purple-primary text-white hover:bg-purple-dark"
            >
              Acessar <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white shadow-md ${
          isMobileMenuOpen ? '' : 'hidden'
        }`}
      >
        <ul className="px-4 py-2 space-y-3">
          <li>
            <Link
              to="/"
              className="block py-2 text-gray-dark hover:text-purple-primary"
              onClick={toggleMobileMenu}
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/ranking"
              className="block py-2 text-gray-dark hover:text-purple-primary"
              onClick={toggleMobileMenu}
            >
              Ranking
            </Link>
          </li>
          <li>
            <Link
              to="/como-funciona"
              className="block py-2 text-gray-dark hover:text-purple-primary"
              onClick={toggleMobileMenu}
            >
              Como Funciona
            </Link>
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
    </header>
  )
}
