import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Award } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-gradient-to-r from-primary to-secondary text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition">
            <Award size={32} className="text-accent" />
            <span>Certified</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-accent transition">Home</Link>
            <Link to="/verify" className="hover:text-accent transition">Verify Certificate</Link>
            <Link to="/dashboard" className="hover:text-accent transition">Dashboard</Link>
            
            {isLoggedIn ? (
              <>
                <button className="btn-secondary">Profile</button>
                <button onClick={() => setIsLoggedIn(false)} className="btn-outline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-accent transition">Login</Link>
                <Link to="/register" className="btn-secondary">Register</Link>
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
            <Link to="/" className="block hover:text-accent transition">Home</Link>
            <Link to="/verify" className="block hover:text-accent transition">Verify Certificate</Link>
            <Link to="/dashboard" className="block hover:text-accent transition">Dashboard</Link>
            
            {isLoggedIn ? (
              <>
                <button className="w-full btn-secondary text-left">Profile</button>
                <button onClick={() => setIsLoggedIn(false)} className="w-full btn-outline text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-accent transition">Login</Link>
                <Link to="/register" className="block btn-secondary">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
