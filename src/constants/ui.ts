/**
 * UI/UX Constants
 */

export const ROUTES = {
  HOME: '/',
  VERIFY: '/verify',
  TRACK_STATUS: '/track-status',
  LOGIN: '/login',
  ADMIN_LOGIN: '/admin-login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '/404',
} as const

export const THEME_COLORS = {
  PRIMARY: '#1e40af',
  SECONDARY: '#7c3aed',
  ACCENT: '#f59e0b',
  SUCCESS: '#10b981',
  ERROR: '#ef4444',
  WARNING: '#f97316',
  INFO: '#06b6d4',
} as const

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const

/**
 * Animation Durations (in ms)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

/**
 * Pagination Defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const

/**
 * Form Validation Patterns
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
  CERTIFICATE_ID: /^[A-Z0-9-]{10,}$/,
} as const

/**
 * Modal Defaults
 */
export const MODAL_DEFAULTS = {
  ANIMATION_DURATION: 300,
  Z_INDEX: 1000,
} as const

/**
 * Contact Information
 */
export const CONTACT_INFO = {
  EMAIL: 'support@certifyhub.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: 'New York, USA',
} as const

/**
 * Social Links
 */
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/certifyhub',
  TWITTER: 'https://twitter.com/certifyhub',
  LINKEDIN: 'https://linkedin.com/company/certifyhub',
  GITHUB: 'https://github.com/certifyhub',
} as const
