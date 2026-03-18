import { AppError } from "../utils/http.js";
import { execute, queryRows } from "../config/database.js";
import { hashPassword, verifyPassword } from "../utils/security.js";
import type { RequestUser } from "../types/index.js";

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

async function getUserById(userId: string): Promise<UserRow> {
  const users = await queryRows<UserRow>("SELECT * FROM users WHERE id = ? LIMIT 1", [userId]);
  const user = users[0];
  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
}

export async function getProfile(auth: RequestUser) {
  const user = await getUserById(auth.userId);
  return mapUser(user);
}

export async function updateProfile(
  auth: RequestUser,
  data: { fullName?: string; accountType?: "individual" | "institution" | "employer" }
) {
  const user = await getUserById(auth.userId);
  const fullName = data.fullName ?? user.full_name;
  const accountType = data.accountType ?? user.account_type;

  await execute("UPDATE users SET full_name = ?, account_type = ?, updated_at = NOW() WHERE id = ?", [
    fullName,
    accountType,
    auth.userId
  ]);

  const updated = await getUserById(auth.userId);
  return mapUser(updated);
}

export async function changePassword(auth: RequestUser, currentPassword: string, newPassword: string): Promise<void> {
  const user = await getUserById(auth.userId);
  const validCurrent = await verifyPassword(currentPassword, user.password_hash);

  if (!validCurrent) {
    throw new AppError(400, "Current password is incorrect");
  }

  const newHash = await hashPassword(newPassword);
  await execute("UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?", [newHash, auth.userId]);
}

export async function deleteAccount(auth: RequestUser, password: string): Promise<void> {
  const user = await getUserById(auth.userId);
  const valid = await verifyPassword(password, user.password_hash);

  if (!valid) {
    throw new AppError(400, "Password is incorrect");
  }

  await execute("DELETE FROM users WHERE id = ?", [auth.userId]);
}
