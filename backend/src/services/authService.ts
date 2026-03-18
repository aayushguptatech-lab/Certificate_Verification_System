import { v4 as uuidv4 } from "uuid";
import type { RequestUser } from "../types/index.js";
import { AppError } from "../utils/http.js";
import { createTokens, hashPassword, verifyPassword, verifyRefreshToken } from "../utils/security.js";
import { execute, queryRows } from "../config/database.js";

interface UserRow {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  account_type: "individual" | "institution" | "employer";
  role: "user" | "admin";
  created_at: Date;
  updated_at: Date;
}

interface AuthResult {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    accountType: "individual" | "institution" | "employer";
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
  };
}

function mapUser(user: UserRow) {
  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    accountType: user.account_type,
    role: user.role,
    createdAt: user.created_at.toISOString(),
    updatedAt: user.updated_at.toISOString()
  };
}

function durationToExpiry(duration: string): Date {
  const match = /^(\d+)([smhd])$/.exec(duration);
  if (!match) {
    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 7);
    return fallback;
  }

  const value = Number(match[1]);
  const unit = match[2];
  const expiresAt = new Date();

  if (unit === "s") expiresAt.setSeconds(expiresAt.getSeconds() + value);
  if (unit === "m") expiresAt.setMinutes(expiresAt.getMinutes() + value);
  if (unit === "h") expiresAt.setHours(expiresAt.getHours() + value);
  if (unit === "d") expiresAt.setDate(expiresAt.getDate() + value);

  return expiresAt;
}

async function createSession(user: UserRow): Promise<AuthResult> {
  const tokens = createTokens({
    sub: user.id,
    role: user.role,
    email: user.email
  });

  const refreshExpiry = durationToExpiry(process.env.JWT_REFRESH_EXPIRES_IN ?? "7d");
  await execute(
    `INSERT INTO refresh_tokens (id, user_id, token, expires_at, revoked, created_at)
     VALUES (?, ?, ?, ?, 0, NOW())`,
    [uuidv4(), user.id, tokens.refreshToken, refreshExpiry]
  );

  return {
    token: tokens.token,
    refreshToken: tokens.refreshToken,
    user: mapUser(user)
  };
}

export async function register(input: {
  fullName: string;
  email: string;
  password: string;
  accountType: "individual" | "institution" | "employer";
}): Promise<AuthResult> {
  const existing = await queryRows<UserRow>("SELECT * FROM users WHERE email = ? LIMIT 1", [input.email]);
  if (existing.length > 0) {
    throw new AppError(409, "Email is already registered");
  }

  const passwordHash = await hashPassword(input.password);
  const userId = uuidv4();

  await execute(
    `INSERT INTO users (id, full_name, email, password_hash, account_type, role, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, 'user', NOW(), NOW())`,
    [userId, input.fullName, input.email, passwordHash, input.accountType]
  );

  const users = await queryRows<UserRow>("SELECT * FROM users WHERE id = ? LIMIT 1", [userId]);
  return createSession(users[0]);
}

export async function login(input: { email: string; password: string }): Promise<AuthResult> {
  const users = await queryRows<UserRow>("SELECT * FROM users WHERE email = ? LIMIT 1", [input.email]);
  const user = users[0];

  if (!user) {
    throw new AppError(401, "Invalid credentials");
  }

  const validPassword = await verifyPassword(input.password, user.password_hash);
  if (!validPassword) {
    throw new AppError(401, "Invalid credentials");
  }

  return createSession(user);
}

export async function adminLogin(input: { adminId: string; password: string }): Promise<AuthResult> {
  const users = await queryRows<UserRow>(
    `SELECT * FROM users
     WHERE (email = ? OR full_name = ? OR id = ?) AND role = 'admin'
     LIMIT 1`,
    [input.adminId, input.adminId, input.adminId]
  );
  const user = users[0];

  if (!user) {
    throw new AppError(401, "Invalid admin credentials");
  }

  const validPassword = await verifyPassword(input.password, user.password_hash);
  if (!validPassword) {
    throw new AppError(401, "Invalid admin credentials");
  }

  return createSession(user);
}

export async function refresh(refreshToken: string): Promise<AuthResult> {
  try {
    verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(401, "Invalid refresh token");
  }

  const rows = await queryRows<{
    id: string;
    user_id: string;
    expires_at: Date;
    revoked: number;
  }>(
    `SELECT id, user_id, expires_at, revoked
     FROM refresh_tokens
     WHERE token = ?
     LIMIT 1`,
    [refreshToken]
  );

  const tokenRecord = rows[0];
  if (!tokenRecord || tokenRecord.revoked || tokenRecord.expires_at < new Date()) {
    throw new AppError(401, "Refresh token is expired or revoked");
  }

  const users = await queryRows<UserRow>("SELECT * FROM users WHERE id = ? LIMIT 1", [tokenRecord.user_id]);
  const user = users[0];
  if (!user) {
    throw new AppError(401, "Invalid refresh token");
  }

  await execute("UPDATE refresh_tokens SET revoked = 1 WHERE id = ?", [tokenRecord.id]);
  return createSession(user);
}

export async function logout(auth: RequestUser, refreshToken?: string): Promise<void> {
  if (refreshToken) {
    await execute("UPDATE refresh_tokens SET revoked = 1 WHERE user_id = ? AND token = ?", [auth.userId, refreshToken]);
    return;
  }

  await execute("UPDATE refresh_tokens SET revoked = 1 WHERE user_id = ?", [auth.userId]);
}

export async function getProfile(auth: RequestUser) {
  const users = await queryRows<UserRow>("SELECT * FROM users WHERE id = ? LIMIT 1", [auth.userId]);
  const user = users[0];
  if (!user) {
    throw new AppError(404, "User not found");
  }

  return mapUser(user);
}
