import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import * as authService from "../services/authService.js";
import { asyncHandler, noContent, ok } from "../utils/http.js";

const registerSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  accountType: z.enum(["individual", "institution", "employer"])
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const adminLoginSchema = z.object({
  adminId: z.string().min(1),
  password: z.string().min(6)
});

const refreshSchema = z.object({
  refreshToken: z.string().min(10)
});

const logoutSchema = z
  .object({
    refreshToken: z.string().min(10).optional()
  })
  .optional();

export const authRoutes = Router();

authRoutes.post(
  "/register",
  validateBody(registerSchema),
  asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    ok(res, result, "Registration successful");
  })
);

authRoutes.post(
  "/login",
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    ok(res, result, "Login successful");
  })
);

authRoutes.post(
  "/admin-login",
  validateBody(adminLoginSchema),
  asyncHandler(async (req, res) => {
    const result = await authService.adminLogin(req.body);
    ok(res, result, "Admin login successful");
  })
);

authRoutes.post(
  "/refresh",
  validateBody(refreshSchema),
  asyncHandler(async (req, res) => {
    const result = await authService.refresh(req.body.refreshToken);
    ok(res, result, "Token refreshed");
  })
);

authRoutes.post(
  "/logout",
  requireAuth,
  validateBody(logoutSchema),
  asyncHandler(async (req, res) => {
    await authService.logout(req.auth!, req.body?.refreshToken);
    noContent(res);
  })
);

authRoutes.get(
  "/profile",
  requireAuth,
  asyncHandler(async (req, res) => {
    const profile = await authService.getProfile(req.auth!);
    ok(res, profile);
  })
);
