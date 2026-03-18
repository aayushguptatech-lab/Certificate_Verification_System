import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/security.js";
import type { Role } from "../types/index.js";
import { AppError } from "../utils/http.js";

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new AppError(401, "Unauthorized"));
    return;
  }

  const token = authHeader.slice(7);

  try {
    const payload = verifyAccessToken(token);
    req.auth = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role
    };
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
}

export function requireRole(roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.auth) {
      next(new AppError(401, "Unauthorized"));
      return;
    }

    if (!roles.includes(req.auth.role)) {
      next(new AppError(403, "Forbidden"));
      return;
    }

    next();
  };
}
