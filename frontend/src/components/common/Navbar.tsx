import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Award } from 'lucide-react'
import { useAuth } from '../../hooks'
import { ROUTES } from '../../constants'
import Button from '../ui/Button'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = async () => {
    try {
      await logout()
      navigate(ROUTES.HOME)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="bg-gradient-to-r from-primary to-secondary text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition">
            <Award size={32} className="text-accent" />
            <span>CertifyHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to={ROUTES.HOME} className="hover:text-accent transition">Home</Link>
            <Link to={ROUTES.VERIFY} className="hover:text-accent transition">Verify Certificate</Link>
            <Link to={ROUTES.TRACK_STATUS} className="hover:text-accent transition">Track Status</Link>
            {isAuthenticated && (
              <Link to={ROUTES.DASHBOARD} className="hover:text-accent transition">Dashboard</Link>
            )}

            {isAuthenticated ? (
              <>
                <Link to={ROUTES.PROFILE} className="hover:text-accent transition">
                  {user?.fullName}
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white border-white hover:bg-white hover:text-primary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="hover:text-accent transition">Login</Link>
                <Button variant="secondary" size="sm">
                  <Link to={ROUTES.ADMIN_LOGIN}>Admin Login</Link>
                </Button>
                <Button variant="secondary" size="sm">
                  <Link to={ROUTES.REGISTER}>Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link to={ROUTES.HOME} className="block hover:text-accent transition">Home</Link>
            <Link to={ROUTES.VERIFY} className="block hover:text-accent transition">Verify Certificate</Link>
            <Link to={ROUTES.TRACK_STATUS} className="block hover:text-accent transition">Track Status</Link>
            {isAuthenticated && (
              <Link to={ROUTES.DASHBOARD} className="block hover:text-accent transition">Dashboard</Link>
            )}

            {isAuthenticated ? (
              <>
                <Link to={ROUTES.PROFILE} className="block hover:text-accent transition">
                  {user?.fullName}
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={handleLogout}
                  className="text-white border-white hover:bg-white hover:text-primary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="block hover:text-accent transition">Login</Link>
                <Link to={ROUTES.ADMIN_LOGIN} className="block">
                  <Button variant="secondary" size="sm" fullWidth>
                    Admin Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER} className="block">
                  <Button variant="secondary" size="sm" fullWidth>
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
