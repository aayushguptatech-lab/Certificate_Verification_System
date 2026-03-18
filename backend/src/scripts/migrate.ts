import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "../config/database.js";

async function migrate(): Promise<void> {
  const sqlDir = path.resolve(process.cwd(), "sql");
  const files = (await readdir(sqlDir)).filter((file) => file.endsWith(".sql")).sort();

  if (files.length === 0) {
    console.log("No SQL migration files found.");
    return;
  }

  for (const file of files) {
    const fullPath = path.join(sqlDir, file);
    const sql = await readFile(fullPath, "utf8");
    const statements = sql
      .split(";")
      .map((statement) => statement.trim())
      .filter((statement) => statement.length > 0);

    console.log(`Running migration ${file}`);
    for (const statement of statements) {
      await db.query(statement);
    }
  }

  console.log("Migrations complete.");
}

migrate()
  .catch((error) => {
    console.error("Migration failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.end();
  });
