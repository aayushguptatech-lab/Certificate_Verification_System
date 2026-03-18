import { useState } from 'react'
import { Search, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { MainLayout } from '../layouts'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import { certificateService } from '../services'
import type { TrackingResult } from '../types'

const TrackStatus = () => {
  const [certificateId, setCertificateId] = useState('')
  const [searchResult, setSearchResult] = useState<TrackingResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!certificateId.trim()) {
      setError('Please enter a certificate ID')
      return
    }

    setIsLoading(true)
    setError('')
    setSearchResult(null)

    try {
      const result = await certificateService.trackStatus(certificateId)
      setSearchResult(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch certificate status. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={24} className="text-green-500" />
      case 'pending':
        return <Clock size={24} className="text-yellow-500" />
      case 'rejected':
        return <AlertCircle size={24} className="text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    }
    return badges[status as keyof typeof badges] || badges.pending
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Certificate Status</h1>
            <p className="text-lg text-gray-600">
              Enter your certificate ID to check its verification status in real-time
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Input
                  label="Certificate ID"
                  placeholder="Enter your certificate ID (e.g., CERT-2024-001)"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  icon={<Search size={20} />}
                  disabled={isLoading}
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search Certificate'}
              </Button>
            </form>
          </Card>

          {/* Search Result */}
          {searchResult && (
            <Card className="border-2 border-green-100">
              <div className="flex items-start gap-4 mb-6">
                <div>{getStatusIcon(searchResult.status)}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Certificate {searchResult.status.charAt(0).toUpperCase() + searchResult.status.slice(1)}
                  </h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(searchResult.status)}`}>
                    {searchResult.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Certificate ID</p>
                  <p className="text-lg font-semibold text-gray-900">{searchResult.certificateId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Holder Name</p>
                  <p className="text-lg font-semibold text-gray-900">{searchResult.holderName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Issued By</p>
                  <p className="text-lg font-semibold text-gray-900">{searchResult.issuerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Issued Date</p>
                  <p className="text-lg font-semibold text-gray-900">{searchResult.issuedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Verified Date</p>
                  <p className="text-lg font-semibold text-gray-900">{searchResult.verifiedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <p className="text-lg font-semibold text-green-600">✓ Authentic</p>
                </div>
              </div>

              <Button
                variant="secondary"
                fullWidth
                onClick={() => {
                  setCertificateId('')
                  setSearchResult(null)
                }}
                className="mt-6"
              >
                Search Another Certificate
              </Button>
            </Card>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Search className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Search</h3>
                <p className="text-gray-600 text-sm">Search any certificate ID instantly</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Status</h3>
                <p className="text-gray-600 text-sm">Get live verification status updates</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <AlertCircle className="text-purple-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Info</h3>
                <p className="text-gray-600 text-sm">View complete certificate details</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TrackStatus
