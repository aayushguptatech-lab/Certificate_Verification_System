import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../constants'
import type { Certificate, CertificateVerificationRequest, CertificateVerificationResult, VerificationLog } from '../types'

class CertificateService {
  /**
   * Get all certificates for current user
   */
  async getCertificates(page?: number, limit?: number): Promise<Certificate[]> {
    return apiClient.get<Certificate[]>(API_ENDPOINTS.CERTIFICATES.LIST, { page, limit })
  }

  /**
   * Get single certificate by ID
   */
  async getCertificate(id: string): Promise<Certificate> {
    return apiClient.get<Certificate>(API_ENDPOINTS.CERTIFICATES.GET(id))
  }

  /**
   * Create new certificate
   */
  async createCertificate(data: Partial<Certificate>): Promise<Certificate> {
    return apiClient.post<Certificate>(API_ENDPOINTS.CERTIFICATES.CREATE, data)
  }

  /**
   * Update certificate
   */
  async updateCertificate(id: string, data: Partial<Certificate>): Promise<Certificate> {
    return apiClient.put<Certificate>(API_ENDPOINTS.CERTIFICATES.UPDATE(id), data)
  }

  /**
   * Delete certificate
   */
  async deleteCertificate(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.CERTIFICATES.DELETE(id))
  }

  /**
   * Verify certificate authenticity
   */
  async verifyCertificate(request: CertificateVerificationRequest): Promise<CertificateVerificationResult> {
    return apiClient.post<CertificateVerificationResult>(API_ENDPOINTS.CERTIFICATES.VERIFY, request)
  }

  /**
   * Get verification history
   */
  async getVerificationHistory(page?: number, limit?: number): Promise<VerificationLog[]> {
    return apiClient.get<VerificationLog[]>(API_ENDPOINTS.CERTIFICATES.GET_HISTORY, { page, limit })
  }
}

export const certificateService = new CertificateService()
