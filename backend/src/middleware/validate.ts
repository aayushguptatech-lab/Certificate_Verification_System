import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";
import { AppError } from "../utils/http.js";

export function validateBody<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(new AppError(400, result.error.issues[0]?.message ?? "Invalid request body"));
      return;
    }

    req.body = result.data;
    next();
  };
}
