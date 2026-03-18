/**
 * User Types
 */
export interface User {
  id: string
  fullName: string
  email: string
  accountType: AccountType
  createdAt: string
  updatedAt: string
}

export type AccountType = 'individual' | 'institution' | 'employer'

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterFormData extends AuthCredentials {
  fullName: string
  confirmPassword: string
  accountType: AccountType
}

/**
 * Certificate Types
 */
export interface Certificate {
  id: string
  certificateId: string
  title: string
  issuer: string
  issueDate: string
  expiryDate: string
  recipientName: string
  status: CertificateStatus
  verificationCode?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export type CertificateStatus = 'active' | 'expired' | 'revoked' | 'pending'

export interface CertificateVerificationRequest {
  certificateId: string
  recipientName: string
}

export interface CertificateVerificationResult extends Certificate {
  isValid: boolean
  verificationDate: string
}

/**
 * Verification Logs
 */
export interface VerificationLog {
  id: string
  certificateId: string
  verifiedBy: string
  verificationDate: string
  status: 'verified' | 'failed'
  ipAddress?: string
}

export interface TrackingResult {
  certificateId: string
  status: 'verified' | 'pending' | 'rejected'
  issuedDate: string
  verifiedDate: string
  holderName: string
  issuerName: string
}

/**
 * API Response Types
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Auth Response
 */
export interface AuthResponse {
  token: string
  refreshToken?: string
  user: User
}

/**
 * Form States
 */
export interface FormState {
  isLoading: boolean
  error: string | null
  success: boolean
}

/**
 * Component Props Types
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  helperText?: string
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}
