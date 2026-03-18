/**
 * Application Configuration
 */

export const APP_CONFIG = {
  APP_NAME: 'Certified',
  APP_VERSION: '1.0.0',
  DESCRIPTION: 'Secure and transparent certificate verification system',
  ENVIRONMENT: (import.meta.env.MODE as string),
  IS_PRODUCTION: (import.meta.env.MODE as string) === 'production',
  IS_DEVELOPMENT: (import.meta.env.MODE as string) === 'development',
} as const

export const CONTACT_INFO = {
  EMAIL: 'support@certifyhub.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: 'New York, USA',
} as const

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/certifyhub',
  TWITTER: 'https://twitter.com/certifyhub',
  LINKEDIN: 'https://linkedin.com/company/certifyhub',
  GITHUB: 'https://github.com/certifyhub',
} as const
