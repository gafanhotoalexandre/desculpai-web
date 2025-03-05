import { NavLink } from 'react-router'

export function DesktopNav() {
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8">
        <li>
          <NavLink
            to="/"
            className="text-gray-dark hover:text-purple-primary transition-colors duration-200"
          >
            Início
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ranking"
            className="text-gray-dark hover:text-purple-primary transition-colors duration-200"
          >
            Ranking
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/como-funciona"
            className="text-gray-dark hover:text-purple-primary transition-colors duration-200"
          >
            Como Funciona
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
