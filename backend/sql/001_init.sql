CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  account_type ENUM('individual', 'institution', 'employer') NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS certificates (
  id CHAR(36) PRIMARY KEY,
  certificate_id VARCHAR(64) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  status ENUM('active', 'expired', 'revoked', 'pending') NOT NULL DEFAULT 'active',
  verification_code VARCHAR(64) NULL,
  description TEXT NULL,
  owner_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  INDEX idx_certificates_owner_id (owner_id),
  INDEX idx_certificates_status (status),
  INDEX idx_certificates_issue_date (issue_date),
  CONSTRAINT fk_certificates_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS verification_logs (
  id CHAR(36) PRIMARY KEY,
  certificate_id VARCHAR(64) NOT NULL,
  certificate_ref_id CHAR(36) NULL,
  verified_by VARCHAR(255) NOT NULL,
  verification_date DATETIME NOT NULL,
  status ENUM('verified', 'failed') NOT NULL,
  ip_address VARCHAR(64) NULL,
  INDEX idx_verification_logs_certificate_id (certificate_id),
  INDEX idx_verification_logs_status (status),
  INDEX idx_verification_logs_verification_date (verification_date),
  CONSTRAINT fk_logs_certificate_ref FOREIGN KEY (certificate_ref_id) REFERENCES certificates(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  token TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  revoked TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  INDEX idx_refresh_tokens_user_id (user_id),
  CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
