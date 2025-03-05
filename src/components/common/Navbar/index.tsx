import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Logo } from '../Logo'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'
import { AuthSection } from './AuthSection'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getInitials = (username?: string) => {
    return username?.substring(0, 2).toUpperCase() || 'U'
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />

        <Button
          variant="ghost"
          size={'icon'}
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-dark"
          aria-label="Toggle mobile menu"
        >
          <Menu size={24} />
        </Button>

        <DesktopNav />

        <div className="hidden md:flex items-center">
          <AuthSection getInitials={getInitials} />
        </div>
      </div>

      <MobileNav
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        getInitials={getInitials}
      />
    </header>
  )
}
