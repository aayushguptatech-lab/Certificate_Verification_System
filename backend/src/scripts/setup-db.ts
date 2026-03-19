import mysql from "mysql2/promise";
import { env } from "../config/env.js";

async function setupDatabase(): Promise<void> {
  // Connect without specifying database
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  });

  try {
    console.log("Creating database if it doesn't exist...");
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\``
    );
    console.log(`Database '${env.DB_NAME}' created/verified successfully.`);
  } catch (error) {
    console.error("Failed to create database:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

setupDatabase()
  .catch((error) => {
    console.error("Setup failed", error);
    process.exitCode = 1;
  });
