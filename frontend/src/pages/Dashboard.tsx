import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Download, Eye, Trash, Plus, Calendar, User, Award, Upload, QrCode as QrIcon, X } from 'lucide-react'
import { certificateService, userService } from '../services'
import { useAuth } from '../hooks'
import CertificateUploadForm from '../components/CertificateUploadForm'
import type { Certificate, VerificationLog, User as UserType } from '../types'
import QrCode from '../components/common/QrCode'

export default function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [verificationHistory, setVerificationHistory] = useState<VerificationLog[]>([])
  const [allUsers, setAllUsers] = useState<UserType[]>([])
  const [profile, setProfile] = useState(user)
  const [isLoading, setIsLoading] = useState(false)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
<<<<<<< Updated upstream
  
  // Modal states
  const [showGenModal, setShowGenModal] = useState(false)
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  
  // Form states for certificate generation
  const [formData, setFormData] = useState({
    certificateId: '',
    title: '',
    issuer: 'Certificate Verification System',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    recipientName: '',
    ownerId: '',
    description: ''
  })
=======
  const [showUploadForm, setShowUploadForm] = useState(false)
>>>>>>> Stashed changes

  const loadDashboard = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [certs, history, profileData] = await Promise.all([
        certificateService.getCertificates(1, 100),
        certificateService.getVerificationHistory(1, 50),
        userService.getProfile(),
      ])
      setCertificates(certs)
      setVerificationHistory(history)
      setProfile(profileData)
      
      if (profileData.role === 'admin') {
        const users = await userService.getUsers(1, 100)
        setAllUsers(users)
      }
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

<<<<<<< Updated upstream
  const handleGenerateCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsActionLoading(true)
    setError(null)
    try {
      await certificateService.createCertificate(formData)
      setShowGenModal(false)
      loadDashboard()
      setFormData({
        certificateId: '',
        title: '',
        issuer: 'Certificate Verification System',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        recipientName: '',
        ownerId: '',
        description: ''
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate certificate'
      setError(message)
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleUserSelect = (userId: string) => {
    const selectedUser = allUsers.find(u => u.id === userId)
    if (selectedUser) {
      setFormData({
        ...formData,
        ownerId: userId,
        recipientName: selectedUser.fullName
      })
    }
=======
  const handleUploadSuccess = (newCertificate: Certificate) => {
    setCertificates((prev) => [newCertificate, ...prev])
    setShowUploadForm(false)
>>>>>>> Stashed changes
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

  const isAdmin = profile?.role === 'admin'

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
<<<<<<< Updated upstream
                <h2 className="text-2xl font-bold text-gray-900">{isAdmin ? 'All Certificates' : 'My Certificates'}</h2>
                <div className="flex gap-2">
                  {isAdmin && (
                    <button 
                      className="btn-primary flex items-center gap-2" 
                      onClick={() => setShowGenModal(true)}
                    >
                      <Plus size={20} />
                      Generate
                    </button>
                  )}
                  <button className="btn-secondary flex items-center gap-2" onClick={loadDashboard}>
=======
                <h2 className="text-2xl font-bold text-gray-900">My Certificates</h2>
                <div className="flex gap-2">
                  <button className="btn-primary flex items-center gap-2" onClick={() => setShowUploadForm(true)}>
                    <Upload size={20} />
                    Upload New
                  </button>
                  <button className="btn-secondary flex items-center gap-2" onClick={loadDashboard}>
                    <Plus size={20} />
>>>>>>> Stashed changes
                    Refresh
                  </button>
                </div>
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
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Certificate</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Recipient</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((cert) => (
                        <tr key={cert.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-900">{cert.title}</span>
                              <span className="text-xs font-mono text-gray-500">{cert.certificateId}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{cert.recipientName}</td>
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
                                className="p-1 hover:bg-gray-200 rounded transition text-primary"
                                title="View QR"
                                onClick={() => setSelectedCert(cert)}
                              >
                                <QrIcon size={18} />
                              </button>
                              <Link
                                to={`/verify?certificateId=${cert.certificateId}&recipientName=${encodeURIComponent(cert.recipientName)}`}
                                className="p-1 hover:bg-gray-200 rounded transition text-primary"
                                title="View Details"
                              >
                                <Eye size={18} />
                              </Link>
                              {isAdmin && (
                                <button
                                  className="p-1 hover:bg-gray-200 rounded transition text-red-500"
                                  title="Delete"
                                  onClick={() => handleDeleteCertificate(cert.id)}
                                >
                                  <Trash size={18} />
                                </button>
                              )}
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
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${isAdmin ? 'bg-purple-600' : 'bg-primary'}`}>
                  {profile?.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Profile</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase ${isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {profile?.role}
                  </span>
                </div>
              </div>
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
                <button className="w-full btn-primary inline-flex items-center justify-center gap-2" onClick={() => setShowUploadForm(true)}>
                  <Upload size={18} />
                  Upload Certificate
                </button>
                <Link to="/verify" className="w-full btn-secondary inline-block text-center">
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
                Share your certificate QR code for quick verification by employers.
              </p>
            </div>
          </div>
        </div>
      </div>

<<<<<<< Updated upstream
      {/* Generate Certificate Modal */}
      {showGenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <h3 className="text-xl font-bold">Generate New Certificate</h3>
              <button onClick={() => setShowGenModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleGenerateCertificate} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Recipient User</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                  value={formData.ownerId}
                  onChange={(e) => handleUserSelect(e.target.value)}
                >
                  <option value="">Select a user...</option>
                  {allUsers.map(u => (
                    <option key={u.id} value={u.id}>{u.fullName} ({u.email})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate ID <span className="text-gray-400 font-normal ml-1">(Optional - leave blank to auto-generate)</span>
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: CERT-2024-XXXX"
                  value={formData.certificateId}
                  onChange={e => setFormData({...formData, certificateId: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Title</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Web Development Fundamentals"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary"
                    required
                    value={formData.issueDate}
                    onChange={e => setFormData({...formData, issueDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary"
                    required
                    value={formData.expiryDate}
                    onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" className="flex-1 btn-outline" onClick={() => setShowGenModal(false)}>Cancel</button>
                <button type="submit" className="flex-1 btn-primary" disabled={isActionLoading}>
                  {isActionLoading ? 'Generating...' : 'Generate Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <h3 className="text-xl font-bold">Certificate QR Code</h3>
              <button onClick={() => setSelectedCert(null)}><X size={24} /></button>
            </div>
            <div className="p-8 flex flex-col items-center text-center">
              <QrCode 
                value={`${window.location.origin}/verify?certificateId=${selectedCert.certificateId}&recipientName=${encodeURIComponent(selectedCert.recipientName)}`} 
                size={200}
              />
              <div className="mt-6">
                <p className="font-bold text-gray-900">{selectedCert.title}</p>
                <p className="text-sm text-gray-500 font-mono mt-1">{selectedCert.certificateId}</p>
                <p className="text-xs text-gray-400 mt-4">Scan this code to verify the certificate authenticity</p>
              </div>
              <button className="w-full btn-primary mt-6" onClick={() => setSelectedCert(null)}>Close</button>
            </div>
          </div>
        </div>
=======
      {/* Upload Form Modal */}
      {showUploadForm && (
        <CertificateUploadForm
          onClose={() => setShowUploadForm(false)}
          onSuccess={handleUploadSuccess}
        />
>>>>>>> Stashed changes
      )}
    </div>
  )
}
