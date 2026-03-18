import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'
import { ROUTES, CONTACT_INFO, SOCIAL_LINKS } from '../../constants'
import { APP_CONFIG } from '../../config/app'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{APP_CONFIG.APP_NAME}</h3>
            <p className="text-sm">{APP_CONFIG.DESCRIPTION}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={ROUTES.HOME} className="hover:text-accent transition">Home</Link></li>
              <li><Link to={ROUTES.VERIFY} className="hover:text-accent transition">Verify</Link></li>
              <li><Link to={ROUTES.DASHBOARD} className="hover:text-accent transition">Dashboard</Link></li>
              <li><Link to={ROUTES.LOGIN} className="hover:text-accent transition">Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="hover:text-accent transition">
                  {CONTACT_INFO.EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <a href={`tel:${CONTACT_INFO.PHONE}`} className="hover:text-accent transition">
                  {CONTACT_INFO.PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                <span>{CONTACT_INFO.ADDRESS}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
                <Facebook size={20} />
              </a>
              <a href={SOCIAL_LINKS.TWITTER} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
                <Twitter size={20} />
              </a>
              <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {currentYear} {APP_CONFIG.APP_NAME}. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent transition">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition">Terms of Service</a>
              <a href="#" className="hover:text-accent transition">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
