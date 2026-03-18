import { useState } from 'react'
import { Search, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { certificateService } from '../services'
import type { CertificateVerificationResult } from '../types'

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [verificationData, setVerificationData] = useState<CertificateVerificationResult | null>(null)
  const [error, setError] = useState('')

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!certificateId || !recipientName) {
      setError('Please fill in all required fields correctly')
      setVerificationStatus('error')
      return
    }

    setError('')
    setVerificationStatus('loading')

    try {
      const response = await certificateService.verifyCertificate({ certificateId, recipientName })
      setVerificationStatus('success')
      setVerificationData(response)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed'
      setError(message)
      setVerificationStatus('error')
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verify Certificate</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your certificate details below to instantly verify its authenticity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Verification Form */}
          <div className="card h-fit sticky top-20">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Verification Details</h2>
            
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Certificate ID / Number
                </label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g., CERT-2024-001234"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Full name of certificate holder"
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary mt-6"
              >
                <Search className="inline mr-2" size={20} />
                Verify Certificate
              </button>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-primary rounded">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">
                Your certificate ID is usually found on the certificate document or in your email confirmation.
              </p>
            </div>
          </div>

          {/* Verification Result */}
          <div>
            {verificationStatus === 'idle' && (
              <div className="card text-center py-12">
                <Search size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Enter certificate details to verify</p>
              </div>
            )}

            {verificationStatus === 'loading' && (
              <div className="card text-center py-12">
                <Clock size={64} className="mx-auto text-primary mb-4 animate-spin" />
                <p className="text-gray-600 font-semibold">Verifying certificate...</p>
              </div>
            )}

            {verificationStatus === 'success' && verificationData && (
              <div className="card border-2 border-green-500">
                <div className="text-center mb-6">
                  <CheckCircle size={64} className="mx-auto text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-900 mt-4">Certificate Verified</h2>
                  <p className="text-green-600 font-semibold mt-2">STATUS: {verificationData.status}</p>
                </div>

                <div className="space-y-4 border-t border-b border-gray-200 py-6 my-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Certificate ID</p>
                      <p className="font-semibold text-gray-900">{verificationData.certificateId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Recipient</p>
                      <p className="font-semibold text-gray-900">{verificationData.recipientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-semibold text-gray-900">{verificationData.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="font-semibold text-gray-900">{verificationData.expiryDate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Issuing Institution</p>
                      <p className="font-semibold text-gray-900">{verificationData.issuer}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Course / Program</p>
                      <p className="font-semibold text-gray-900">{verificationData.title}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded mb-4">
                  <p className="text-sm text-gray-600 mb-1">Verification Code</p>
                  <p className="font-mono font-bold text-gray-900">{verificationData.verificationCode}</p>
                </div>

                <button
                  onClick={() => {
                    setVerificationStatus('idle')
                    setCertificateId('')
                    setRecipientName('')
                  }}
                  className="w-full btn-secondary"
                >
                  Verify Another
                </button>
              </div>
            )}

            {verificationStatus === 'error' && (
              <div className="card border-2 border-red-500">
                <div className="text-center">
                  <AlertCircle size={64} className="mx-auto text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900 mt-4">Verification Failed</h2>
                  <p className="text-red-600 mt-2">{error || 'Please fill in all required fields correctly'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
