import { Outlet } from 'react-router'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow font-inter">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
