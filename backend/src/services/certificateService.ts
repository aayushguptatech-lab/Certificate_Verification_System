import { v4 as uuidv4 } from "uuid";
import type { Request } from "express";
import type { RequestUser } from "../types/index.js";
import { AppError } from "../utils/http.js";
import { execute, queryRows } from "../config/database.js";

interface CertificateRow {
  id: string;
  certificate_id: string;
  title: string;
  issuer: string;
  issue_date: Date;
  expiry_date: Date;
  recipient_name: string;
  status: "active" | "expired" | "revoked" | "pending";
  verification_code: string | null;
  description: string | null;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

interface VerificationLogRow {
  id: string;
  certificate_id: string;
  verified_by: string;
  verification_date: Date;
  status: "verified" | "failed";
  ip_address: string | null;
}

function mapCertificate(row: CertificateRow) {
  return {
    id: row.id,
    certificateId: row.certificate_id,
    title: row.title,
    issuer: row.issuer,
    issueDate: row.issue_date.toISOString().slice(0, 10),
    expiryDate: row.expiry_date.toISOString().slice(0, 10),
    recipientName: row.recipient_name,
    status: row.status,
    verificationCode: row.verification_code ?? undefined,
    description: row.description ?? undefined,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString()
  };
}

function mapVerificationLog(row: VerificationLogRow) {
  return {
    id: row.id,
    certificateId: row.certificate_id,
    verifiedBy: row.verified_by,
    verificationDate: row.verification_date.toISOString(),
    status: row.status,
    ipAddress: row.ip_address ?? undefined
  };
}

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (Array.isArray(forwarded)) return forwarded[0];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.ip || "unknown";
}

async function getCertificateById(id: string): Promise<CertificateRow> {
  const rows = await queryRows<CertificateRow>("SELECT * FROM certificates WHERE id = ? LIMIT 1", [id]);
  const certificate = rows[0];
  if (!certificate) {
    throw new AppError(404, "Certificate not found");
  }

  return certificate;
}

export async function getCertificates(auth: RequestUser, page = 1, limit = 10) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 100) : 10;
  const offset = (safePage - 1) * safeLimit;

  if (auth.role === "admin") {
    const rows = await queryRows<CertificateRow>(
      "SELECT * FROM certificates ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [safeLimit, offset]
    );
    return rows.map(mapCertificate);
  }

  const rows = await queryRows<CertificateRow>(
    "SELECT * FROM certificates WHERE owner_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
    [auth.userId, safeLimit, offset]
  );
  return rows.map(mapCertificate);
}

export async function getCertificate(auth: RequestUser, id: string) {
  const cert = await getCertificateById(id);

  if (auth.role !== "admin" && cert.owner_id !== auth.userId) {
    throw new AppError(403, "Forbidden");
  }

  return mapCertificate(cert);
}

export async function createCertificate(
  auth: RequestUser,
  data: {
    certificateId: string;
    title: string;
    issuer: string;
    issueDate: string;
    expiryDate: string;
    recipientName: string;
    status?: "active" | "expired" | "revoked" | "pending";
    verificationCode?: string;
    description?: string;
  }
) {
  const existing = await queryRows<CertificateRow>("SELECT * FROM certificates WHERE certificate_id = ? LIMIT 1", [
    data.certificateId
  ]);

  if (existing.length > 0) {
    throw new AppError(409, "Certificate ID already exists");
  }

  const certId = uuidv4();
  await execute(
    `INSERT INTO certificates
      (id, certificate_id, title, issuer, issue_date, expiry_date, recipient_name, status, verification_code, description, owner_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      certId,
      data.certificateId,
      data.title,
      data.issuer,
      data.issueDate,
      data.expiryDate,
      data.recipientName,
      data.status ?? "active",
      data.verificationCode ?? null,
      data.description ?? null,
      auth.userId
    ]
  );

  const cert = await getCertificateById(certId);
  return mapCertificate(cert);
}

export async function updateCertificate(
  auth: RequestUser,
  id: string,
  data: {
    title?: string;
    issuer?: string;
    issueDate?: string;
    expiryDate?: string;
    recipientName?: string;
    status?: "active" | "expired" | "revoked" | "pending";
    verificationCode?: string;
    description?: string;
  }
) {
  const cert = await getCertificateById(id);

  if (auth.role !== "admin" && cert.owner_id !== auth.userId) {
    throw new AppError(403, "Forbidden");
  }

  await execute(
    `UPDATE certificates SET
      title = ?,
      issuer = ?,
      issue_date = ?,
      expiry_date = ?,
      recipient_name = ?,
      status = ?,
      verification_code = ?,
      description = ?,
      updated_at = NOW()
     WHERE id = ?`,
    [
      data.title ?? cert.title,
      data.issuer ?? cert.issuer,
      data.issueDate ?? cert.issue_date.toISOString().slice(0, 10),
      data.expiryDate ?? cert.expiry_date.toISOString().slice(0, 10),
      data.recipientName ?? cert.recipient_name,
      data.status ?? cert.status,
      data.verificationCode ?? cert.verification_code,
      data.description ?? cert.description,
      id
    ]
  );

  const updated = await getCertificateById(id);
  return mapCertificate(updated);
}

export async function deleteCertificate(auth: RequestUser, id: string): Promise<void> {
  const cert = await getCertificateById(id);

  if (auth.role !== "admin" && cert.owner_id !== auth.userId) {
    throw new AppError(403, "Forbidden");
  }

  await execute("DELETE FROM certificates WHERE id = ?", [id]);
}

export async function verifyCertificate(
  req: Request,
  input: { certificateId: string; recipientName: string }
) {
  const rows = await queryRows<CertificateRow>(
    `SELECT * FROM certificates
     WHERE certificate_id = ? AND LOWER(recipient_name) = LOWER(?)
     LIMIT 1`,
    [input.certificateId, input.recipientName]
  );

  const cert = rows[0];
  const ipAddress = getClientIp(req);

  if (!cert) {
    await execute(
      `INSERT INTO verification_logs (id, certificate_id, certificate_ref_id, verified_by, verification_date, status, ip_address)
       VALUES (?, ?, NULL, ?, NOW(), 'failed', ?)`,
      [uuidv4(), input.certificateId, input.recipientName, ipAddress]
    );
    throw new AppError(404, "Certificate not found or recipient name mismatch");
  }

  await execute(
    `INSERT INTO verification_logs (id, certificate_id, certificate_ref_id, verified_by, verification_date, status, ip_address)
     VALUES (?, ?, ?, ?, NOW(), 'verified', ?)`,
    [uuidv4(), cert.certificate_id, cert.id, input.recipientName, ipAddress]
  );

  return {
    ...mapCertificate(cert),
    isValid: cert.status === "active",
    verificationDate: new Date().toISOString()
  };
}

export async function getVerificationHistory(auth: RequestUser, page = 1, limit = 10) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 100) : 10;
  const offset = (safePage - 1) * safeLimit;

  if (auth.role === "admin") {
    const rows = await queryRows<VerificationLogRow>(
      `SELECT id, certificate_id, verified_by, verification_date, status, ip_address
       FROM verification_logs
       ORDER BY verification_date DESC
       LIMIT ? OFFSET ?`,
      [safeLimit, offset]
    );
    return rows.map(mapVerificationLog);
  }

  const rows = await queryRows<VerificationLogRow>(
    `SELECT l.id, l.certificate_id, l.verified_by, l.verification_date, l.status, l.ip_address
     FROM verification_logs l
     INNER JOIN certificates c ON c.id = l.certificate_ref_id
     WHERE c.owner_id = ?
     ORDER BY l.verification_date DESC
     LIMIT ? OFFSET ?`,
    [auth.userId, safeLimit, offset]
  );
  return rows.map(mapVerificationLog);
}

export async function trackCertificate(certificateId: string) {
  const rows = await queryRows<CertificateRow>(
    "SELECT * FROM certificates WHERE certificate_id = ? LIMIT 1",
    [certificateId]
  );

  const cert = rows[0];
  if (!cert) {
    throw new AppError(404, "Certificate not found");
  }

  const mappedStatus = cert.status === "active" ? "verified" : cert.status === "pending" ? "pending" : "rejected";

  return {
    certificateId: cert.certificate_id,
    status: mappedStatus,
    issuedDate: cert.issue_date.toISOString().slice(0, 10),
    verifiedDate: cert.updated_at.toISOString().slice(0, 10),
    holderName: cert.recipient_name,
    issuerName: cert.issuer
  };
}
