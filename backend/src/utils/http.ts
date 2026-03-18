import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function ok<T>(res: Response, data: T, message?: string): void {
  res.status(200).json({ success: true, data, message });
}

export function created<T>(res: Response, data: T, message?: string): void {
  res.status(201).json({ success: true, data, message });
}

export function noContent(res: Response): void {
  res.status(200).json({ success: true, data: null });
}

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
