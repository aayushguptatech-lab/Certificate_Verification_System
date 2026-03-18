export type Role = "user" | "admin";
export type AccountType = "individual" | "institution" | "employer";
export type CertificateStatus = "active" | "expired" | "revoked" | "pending";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  accountType: AccountType;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  role: Role;
  email: string;
}

export interface TrackingResult {
  certificateId: string;
  status: "verified" | "pending" | "rejected";
  issuedDate: string;
  verifiedDate: string;
  holderName: string;
  issuerName: string;
}

export interface RequestUser {
  userId: string;
  email: string;
  role: Role;
}
