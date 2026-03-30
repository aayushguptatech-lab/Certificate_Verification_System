import { useState } from 'react'
import { X, Upload, Loader } from 'lucide-react'
import { certificateService } from '../services'
import type { Certificate, CertificateStatus } from '../types'

interface CertificateUploadFormProps {
  onClose: () => void
  onSuccess: (certificate: Certificate) => void
}

export default function CertificateUploadForm({ onClose, onSuccess }: CertificateUploadFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLifetime, setIsLifetime] = useState(false)
  const [formData, setFormData] = useState({
    certificateId: '',
    title: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    recipientName: '',
    status: 'active' as CertificateStatus,
    verificationCode: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): string | null => {
    if (!formData.certificateId.trim()) return 'Certificate ID is required'
    if (!formData.title.trim()) return 'Title is required'
    if (!formData.issuer.trim()) return 'Issuer is required'
    if (!formData.issueDate) return 'Issue date is required'
    if (!isLifetime && !formData.expiryDate) return 'Expiry date is required (or mark as Lifetime)'
    if (!formData.recipientName.trim()) return 'Recipient name is required'

    // Validate certificate ID format - now accepts both uppercase and lowercase
    if (!/^[A-Za-z0-9-]{10,}$/.test(formData.certificateId)) {
      return 'Certificate ID must be at least 10 characters and contain only letters, numbers, and hyphens'
    }

    // Validate dates only if not lifetime
    if (!isLifetime) {
      const issueDate = new Date(formData.issueDate)
      const expiryDate = new Date(formData.expiryDate)
      if (issueDate >= expiryDate) {
        return 'Expiry date must be after issue date'
      }
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    try {
      const data = {
        ...formData,
        expiryDate: isLifetime ? undefined : formData.expiryDate,
        isLifetime,
        verificationCode: formData.verificationCode || undefined,
        description: formData.description || undefined,
      }
      const newCertificate = await certificateService.createCertificate(data)
      onSuccess(newCertificate)
      onClose()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create certificate'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <Upload size={24} className="text-primary" />
            <h2 className="text-2xl font-bold text-gray-900">Upload Certificate</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Certificate ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Certificate ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="certificateId"
              value={formData.certificateId}
              onChange={handleChange}
              placeholder="e.g., UC-1d146795-12b7-4a1e-9c9e-7b2e3b9d3e3e"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">Must be 10+ characters with letters, numbers, and hyphens (uppercase or lowercase)</p>
          </div>

          {/* Title and Issuer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Bachelor of Science"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issuer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="e.g., University of Example"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Recipient Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Full name of certificate holder"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Issue Date and Expiry Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {!isLifetime && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
            )}
          </div>

          {/* Lifetime Checkbox */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <input
              type="checkbox"
              id="isLifetime"
              checked={isLifetime}
              onChange={(e) => setIsLifetime(e.target.checked)}
              className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary cursor-pointer"
              disabled={isLoading}
            />
            <label htmlFor="isLifetime" className="cursor-pointer flex-1">
              <p className="font-semibold text-gray-900">This is a Lifetime Certificate</p>
              <p className="text-xs text-gray-600">Check this box if the certificate never expires (e.g., Udemy, Coursera lifetime access)</p>
            </label>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>

          {/* Verification Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Verification Code <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
              placeholder="e.g., VER-ABC123XYZ"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional details about the certificate..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Upload Certificate
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
