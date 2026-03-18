import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Eye, Trash, Plus, MoreVertical, Calendar, User, Award } from 'lucide-react'
import { certificateService, userService } from '../services'
import { useAuth } from '../hooks'
import type { Certificate, VerificationLog } from '../types'

export default function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [verificationHistory, setVerificationHistory] = useState<VerificationLog[]>([])
  const [profile, setProfile] = useState(user)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadDashboard = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [certs, history, profileData] = await Promise.all([
        certificateService.getCertificates(1, 50),
        certificateService.getVerificationHistory(1, 50),
        userService.getProfile(),
      ])
      setCertificates(certs)
      setVerificationHistory(history)
      setProfile(profileData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load dashboard data'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboard()
    }
  }, [isAuthenticated, loadDashboard])

  const stats = useMemo(() => {
    const total = certificates.length
    const active = certificates.filter((cert) => cert.status === 'active').length
    const expired = certificates.filter((cert) => cert.status === 'expired').length
    return { total, active, expired, verifications: verificationHistory.length }
  }, [certificates, verificationHistory])

  const handleDeleteCertificate = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this certificate?')
    if (!confirmed) return

    try {
      await certificateService.deleteCertificate(id)
      setCertificates((prev) => prev.filter((cert) => cert.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete certificate'
      setError(message)
    }
  }

  const handleLogout = async () => {
    await logout()
    window.location.href = '/login'
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Login Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to view your dashboard.</p>
            <Link to="/login" className="btn-primary inline-block">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {/* Header with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Certificates</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Award size={40} className="text-primary opacity-20" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full"></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Expired</p>
                <p className="text-3xl font-bold text-red-600">{stats.expired}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full"></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Verifications</p>
                <p className="text-3xl font-bold text-primary">{stats.verifications}</p>
              </div>
              <Eye size={40} className="text-primary opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Certificates Section */}
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Certificates</h2>
                <button className="btn-secondary flex items-center gap-2" onClick={loadDashboard}>
                  <Plus size={20} />
                  Refresh
                </button>
              </div>

              {isLoading ? (
                <p className="text-gray-600">Loading certificates...</p>
              ) : certificates.length === 0 ? (
                <p className="text-gray-600">No certificates found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Certificate ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Issuer</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((cert) => (
                        <tr key={cert.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="py-3 px-4 text-sm font-mono text-gray-600">{cert.certificateId}</td>
                          <td className="py-3 px-4 text-sm text-gray-900 font-semibold">{cert.title}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{cert.issuer}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              cert.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : cert.status === 'expired'
                                  ? 'bg-red-100 text-red-700'
                                  : cert.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-gray-100 text-gray-700'
                            }`}>
                              {cert.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                className="p-1 hover:bg-gray-200 rounded transition"
                                title="View"
                                onClick={() => window.alert(`Certificate: ${cert.certificateId}`)}
                              >
                                <Eye size={18} className="text-primary" />
                              </button>
                              <button
                                className="p-1 hover:bg-gray-200 rounded transition"
                                title="Download"
                                onClick={() => window.alert('Download endpoint not implemented yet.')}
                              >
                                <Download size={18} className="text-primary" />
                              </button>
                              <button
                                className="p-1 hover:bg-gray-200 rounded transition"
                                title="Delete"
                                onClick={() => handleDeleteCertificate(cert.id)}
                              >
                                <Trash size={18} className="text-red-500" />
                              </button>
                              <button className="p-1 hover:bg-gray-200 rounded transition" title="More options">
                                <MoreVertical size={18} className="text-gray-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Verification History */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Verifications</h2>

              {verificationHistory.length === 0 ? (
                <p className="text-gray-600">No verification history found.</p>
              ) : (
                <div className="space-y-3">
                  {verificationHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.certificateId}</p>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(item.verificationDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {item.verifiedBy}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profile</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-900">{profile?.fullName ?? 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{profile?.email ?? 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-semibold text-gray-900">{profile?.accountType ?? 'N/A'}</p>
                </div>
                <button className="w-full btn-outline mt-4">Edit Profile</button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/verify" className="w-full btn-primary inline-block text-center">
                  Verify Another
                </Link>
                <button className="w-full btn-outline">Download Report</button>
                <button className="w-full text-primary font-semibold hover:underline text-left">
                  Settings
                </button>
                <button className="w-full text-red-600 font-semibold hover:underline text-left" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-2">Pro Tip</h4>
              <p className="text-sm text-gray-600">
                Keep your certificates updated for better verification success rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
