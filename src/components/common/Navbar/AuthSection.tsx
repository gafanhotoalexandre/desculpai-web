import { Link, useNavigate } from 'react-router'
import { useAuthStore } from '@/features/auth/stores/authStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, LogOut, ArrowRight } from 'lucide-react'

interface AuthSectionProps {
  getInitials: (username?: string) => string
}

export function AuthSection({ getInitials }: AuthSectionProps) {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (isAuthenticated) {
    return (
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
    )
  }

  return (
    <Link
      to="/auth"
      className="flex items-center gap-1 px-4 py-2 rounded-md font-medium transition-colors duration-200 font-inter bg-purple-primary text-white hover:bg-purple-dark"
    >
      Acessar <ArrowRight size={16} />
    </Link>
  )
}
