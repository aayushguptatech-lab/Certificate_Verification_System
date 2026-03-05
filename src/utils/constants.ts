export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  CERTIFICATES: {
    LIST: '/certificates',
    GET: (id: string) => `/certificates/${id}`,
    CREATE: '/certificates',
    UPDATE: (id: string) => `/certificates/${id}`,
    DELETE: (id: string) => `/certificates/${id}`,
    VERIFY: '/certificates/verify'
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    DELETE: '/users/account'
  }
}

export const CERTIFICATE_STATUS = {
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  REVOKED: 'Revoked',
  PENDING: 'Pending'
}

export const ACCOUNT_TYPES = {
  INDIVIDUAL: 'individual',
  INSTITUTION: 'institution',
  EMPLOYER: 'employer'
}
