import { Link } from 'react-router-dom'
import { AlertCircle, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle size={80} className="mx-auto text-red-500 mb-6 opacity-20" />
        
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="space-y-4">
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <Home size={20} />
            Back to Home
          </Link>
          
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-3">Or try searching for:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Link to="/verify" className="px-3 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white transition">
                <Search size={14} className="inline mr-1" />
                Verify Certificate
              </Link>
              <Link to="/dashboard" className="px-3 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white transition">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
