import { useState } from 'react'
import { Download, Eye, Trash, Plus, MoreVertical, Calendar, User, Award } from 'lucide-react'

export default function Dashboard() {
  const [certificates] = useState([
    {
      id: 1,
      certId: 'CERT-2024-001234',
      title: 'Full Stack Development',
      issuer: 'Tech Academy',
      issueDate: '2024-01-15',
      expiryDate: '2026-01-15',
      status: 'Active'
    },
    {
      id: 2,
      certId: 'CERT-2024-001235',
      title: 'Cloud Computing Fundamentals',
      issuer: 'Cloud Institute',
      issueDate: '2024-02-20',
      expiryDate: '2025-02-20',
      status: 'Active'
    },
    {
      id: 3,
      certId: 'CERT-2023-001100',
      title: 'Web Development Basics',
      issuer: 'WebDev School',
      issueDate: '2023-06-10',
      expiryDate: '2024-06-10',
      status: 'Expired'
    }
  ])

  const [verificationHistory] = useState([
    { id: 1, certId: 'CERT-2024-001234', date: '2024-03-01', verifiedBy: 'John Doe', status: 'Verified' },
    { id: 2, certId: 'CERT-2024-001235', date: '2024-03-02', verifiedBy: 'Jane Smith', status: 'Verified' },
    { id: 3, certId: 'CERT-2023-001100', date: '2024-02-15', verifiedBy: 'Admin', status: 'Expired' }
  ])

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Certificates</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <Award size={40} className="text-primary opacity-20" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active</p>
                <p className="text-3xl font-bold text-green-600">2</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full"></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Expired</p>
                <p className="text-3xl font-bold text-red-600">1</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full"></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Verifications</p>
                <p className="text-3xl font-bold text-primary">5</p>
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
                <button className="btn-secondary flex items-center gap-2">
                  <Plus size={20} />
                  Add Certificate
                </button>
              </div>

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
                        <td className="py-3 px-4 text-sm font-mono text-gray-600">{cert.certId}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 font-semibold">{cert.title}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{cert.issuer}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            cert.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-200 rounded transition" title="View">
                              <Eye size={18} className="text-primary" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition" title="Download">
                              <Download size={18} className="text-primary" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition" title="Delete">
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
            </div>

            {/* Verification History */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Verifications</h2>

              <div className="space-y-3">
                {verificationHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.certId}</p>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {item.verifiedBy}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
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
                  <p className="font-semibold text-gray-900">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">john@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-semibold text-gray-900">Individual</p>
                </div>
                <button className="w-full btn-outline mt-4">Edit Profile</button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary">Verify Another</button>
                <button className="w-full btn-outline">Download Report</button>
                <button className="w-full text-primary font-semibold hover:underline text-left">
                  Settings
                </button>
                <button className="w-full text-red-600 font-semibold hover:underline text-left">
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
