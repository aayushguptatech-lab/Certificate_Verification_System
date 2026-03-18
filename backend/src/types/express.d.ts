import type { RequestUser } from "./index.js";

declare global {
  namespace Express {
    interface Request {
      auth?: RequestUser;
    }
  }
}

export {};
