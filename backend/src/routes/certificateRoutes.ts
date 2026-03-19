import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import * as certificateService from "../services/certificateService.js";
import { AppError } from "../utils/http.js";
import { asyncHandler, noContent, ok } from "../utils/http.js";

const createSchema = z.object({
  certificateId: z.string().regex(/^[A-Za-z0-9-]{10,}$/, "Certificate ID must be at least 10 characters and contain only letters, numbers, and hyphens"),
  title: z.string().min(2).max(255),
  issuer: z.string().min(2).max(255),
  issueDate: z.string().date(),
  expiryDate: z.string().date().optional(),
  recipientName: z.string().min(2).max(255),
  status: z.enum(["active", "expired", "revoked", "pending"]).optional(),
  verificationCode: z.string().max(64).optional(),
  description: z.string().max(2000).optional(),
  isLifetime: z.boolean().optional()
});

const updateSchema = z
  .object({
    title: z.string().min(2).max(255).optional(),
    issuer: z.string().min(2).max(255).optional(),
    issueDate: z.string().date().optional(),
    expiryDate: z.string().date().optional(),
    recipientName: z.string().min(2).max(255).optional(),
    status: z.enum(["active", "expired", "revoked", "pending"]).optional(),
    verificationCode: z.string().max(64).optional(),
    description: z.string().max(2000).optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
  });

const verifySchema = z.object({
  certificateId: z.string().min(3),
  recipientName: z.string().min(2)
});

export const certificateRoutes = Router();

certificateRoutes.post(
  "/verify",
  validateBody(verifySchema),
  asyncHandler(async (req, res) => {
    const result = await certificateService.verifyCertificate(req, req.body);
    ok(res, result, "Certificate verified");
  })
);

certificateRoutes.get(
  "/track",
  asyncHandler(async (req, res) => {
    const certificateId = String(req.query.certificateId ?? "").trim();
    if (!certificateId) {
      throw new AppError(400, "certificateId query parameter is required");
    }

    const result = await certificateService.trackCertificate(certificateId);
    ok(res, result);
  })
);

certificateRoutes.use(requireAuth);

certificateRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const data = await certificateService.getCertificates(req.auth!, page, limit);
    ok(res, data);
  })
);

certificateRoutes.post(
  "/",
  validateBody(createSchema),
  asyncHandler(async (req, res) => {
    const data = await certificateService.createCertificate(req.auth!, req.body);
    ok(res, data, "Certificate created");
  })
);

certificateRoutes.get(
  "/history",
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const data = await certificateService.getVerificationHistory(req.auth!, page, limit);
    ok(res, data);
  })
);

certificateRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = await certificateService.getCertificate(req.auth!, String(req.params.id));
    ok(res, data);
  })
);

certificateRoutes.put(
  "/:id",
  validateBody(updateSchema),
  asyncHandler(async (req, res) => {
    const data = await certificateService.updateCertificate(req.auth!, String(req.params.id), req.body);
    ok(res, data, "Certificate updated");
  })
);

certificateRoutes.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await certificateService.deleteCertificate(req.auth!, String(req.params.id));
    noContent(res);
  })
);
