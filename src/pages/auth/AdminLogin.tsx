import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Eye, EyeOff } from 'lucide-react'
import { AuthLayout } from '../../layouts'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    adminId: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validation
    if (!formData.adminId.trim()) {
      setError('Admin ID is required')
      setIsLoading(false)
      return
    }

    if (!formData.password) {
      setError('Password is required')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call for admin login
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock admin login - replace with actual API call
      if (formData.adminId === 'admin' && formData.password === 'admin123') {
        // Store admin token (mock)
        localStorage.setItem('adminToken', 'mock-admin-token-' + Date.now())
        localStorage.setItem('adminId', formData.adminId)
        
        setFormData({ adminId: '', password: '' })
        navigate('/admin/dashboard')
      } else {
        setError('Invalid admin ID or password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
      console.error('Admin login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4">
            <Shield size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Secure administrator login</p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-primary border-opacity-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Admin ID Input */}
            <Input
              label="Admin ID"
              name="adminId"
              type="text"
              placeholder="Enter your admin ID"
              value={formData.adminId}
              onChange={handleChange}
              disabled={isLoading}
              error={error && !formData.adminId ? 'Admin ID is required' : ''}
            />

            {/* Password Input */}
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                error={error && !formData.password ? 'Password is required' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-gray-500 hover:text-gray-700 transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login as Admin'}
            </Button>

            {/* Demo Credentials Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="font-semibold text-blue-900 mb-2">Demo Credentials:</p>
              <p className="text-blue-800">Admin ID: <span className="font-mono">admin</span></p>
              <p className="text-blue-800">Password: <span className="font-mono">admin123</span></p>
            </div>
          </form>
        </Card>

        {/* Security Info */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-2">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <p className="text-xs text-gray-600">SSL Encrypted</p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-2">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <p className="text-xs text-gray-600">2-Factor Auth</p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-2">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <p className="text-xs text-gray-600">Secure Login</p>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default AdminLogin
