import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import * as userService from "../services/userService.js";
import { asyncHandler, noContent, ok } from "../utils/http.js";

const updateProfileSchema = z
  .object({
    fullName: z.string().min(2).max(100).optional(),
    accountType: z.enum(["individual", "institution", "employer"]).optional()
  })
  .refine((data) => data.fullName !== undefined || data.accountType !== undefined, {
    message: "At least one field is required"
  });

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(128)
});

const deleteAccountSchema = z.object({
  password: z.string().min(1)
});

export const userRoutes = Router();

userRoutes.use(requireAuth);

userRoutes.get(
  "/profile",
  asyncHandler(async (req, res) => {
    const profile = await userService.getProfile(req.auth!);
    ok(res, profile);
  })
);

userRoutes.put(
  "/profile",
  validateBody(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const updated = await userService.updateProfile(req.auth!, req.body);
    ok(res, updated, "Profile updated");
  })
);

userRoutes.post(
  "/change-password",
  validateBody(changePasswordSchema),
  asyncHandler(async (req, res) => {
    await userService.changePassword(req.auth!, req.body.currentPassword, req.body.newPassword);
    noContent(res);
  })
);

userRoutes.post(
  "/account",
  validateBody(deleteAccountSchema),
  asyncHandler(async (req, res) => {
    await userService.deleteAccount(req.auth!, req.body.password);
    noContent(res);
  })
);
