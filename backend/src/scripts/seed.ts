import { v4 as uuidv4 } from "uuid";
import { execute, queryRows, db } from "../config/database.js";
import { env } from "../config/env.js";
import { hashPassword } from "../utils/security.js";

interface UserRow {
  id: string;
  email: string;
}

async function seed(): Promise<void> {
  const existingAdmin = await queryRows<UserRow>("SELECT id, email FROM users WHERE email = ? LIMIT 1", [
    env.ADMIN_EMAIL
  ]);

  let adminId = existingAdmin[0]?.id;
  if (!adminId) {
    adminId = uuidv4();
    const passwordHash = await hashPassword(env.ADMIN_PASSWORD);

    await execute(
      `INSERT INTO users (id, full_name, email, password_hash, account_type, role, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'institution', 'admin', NOW(), NOW())`,
      [adminId, env.ADMIN_FULL_NAME, env.ADMIN_EMAIL, passwordHash]
    );

    console.log(`Created admin user: ${env.ADMIN_EMAIL}`);
  } else {
    console.log(`Admin user already exists: ${env.ADMIN_EMAIL}`);
  }

  const sampleCerts = [
    {
      certificateId: "CERT-2024-001234",
      title: "Advanced Certificate in Full Stack Development",
      issuer: "Technical University",
      issueDate: "2024-01-15",
      expiryDate: "2026-01-15",
      recipientName: "John Doe",
      status: "active"
    },
    {
      certificateId: "CERT-2024-001235",
      title: "Cloud Computing Fundamentals",
      issuer: "ABC University",
      issueDate: "2024-02-10",
      expiryDate: "2025-02-10",
      recipientName: "Jane Smith",
      status: "pending"
    }
  ];

  for (const cert of sampleCerts) {
    const existing = await queryRows<{ id: string }>("SELECT id FROM certificates WHERE certificate_id = ? LIMIT 1", [
      cert.certificateId
    ]);

    if (existing.length === 0) {
      await execute(
        `INSERT INTO certificates
          (id, certificate_id, title, issuer, issue_date, expiry_date, recipient_name, status, verification_code, description, owner_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          uuidv4(),
          cert.certificateId,
          cert.title,
          cert.issuer,
          cert.issueDate,
          cert.expiryDate,
          cert.recipientName,
          cert.status,
          `VER-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
          "Seeded sample certificate",
          adminId
        ]
      );
      console.log(`Seeded certificate ${cert.certificateId}`);
    }
  }

  console.log("Seeding complete.");
}

seed()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.end();
  });
