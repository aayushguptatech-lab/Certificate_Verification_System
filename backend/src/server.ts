import { app } from "./app.js";
import { env } from "./config/env.js";
import { db } from "./config/database.js";

async function bootstrap(): Promise<void> {
  await db.query("SELECT 1");

  app.listen(env.PORT, () => {
    console.log(`Backend running at http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
