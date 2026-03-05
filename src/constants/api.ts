/**
 * API Configuration and Endpoints
 */

export const API_CONFIG = {
  BASE_URL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
}

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },

  // Certificate endpoints
  CERTIFICATES: {
    LIST: '/certificates',
    GET: (id: string) => `/certificates/${id}`,
    CREATE: '/certificates',
    UPDATE: (id: string) => `/certificates/${id}`,
    DELETE: (id: string) => `/certificates/${id}`,
    VERIFY: '/certificates/verify',
    GET_HISTORY: '/certificates/history',
  },

  // User endpoints
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    DELETE: '/users/account',
    CHANGE_PASSWORD: '/users/change-password',
  },

  // Admin endpoints (for future)
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    CERTIFICATES: '/admin/certificates',
    REPORTS: '/admin/reports',
  },
}

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference',
  LANGUAGE: 'language_preference',
}

/**
 * Certificate Status Options
 */
export const CERTIFICATE_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  PENDING: 'pending',
} as const

/**
 * Account Type Options
 */
export const ACCOUNT_TYPES = {
  INDIVIDUAL: 'individual',
  INSTITUTION: 'institution',
  EMPLOYER: 'employer',
} as const

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please fill in all required fields correctly.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  GENERIC: 'Something went wrong. Please try again.',
}

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Welcome back.',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  CERTIFICATE_VERIFIED: 'Certificate verified successfully.',
  CERTIFICATE_CREATED: 'Certificate added successfully.',
  CERTIFICATE_UPDATED: 'Certificate updated successfully.',
  CERTIFICATE_DELETED: 'Certificate deleted successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
}

/**
 * Validation Limits
 */
export const VALIDATION_LIMITS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MAX_FILE_SIZE: 5242880, // 5MB
  ALLOWED_FILE_TYPES: ['application/pdf', 'image/png', 'image/jpeg'],
}
