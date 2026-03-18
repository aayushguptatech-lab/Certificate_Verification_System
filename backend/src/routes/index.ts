import { Router } from "express";
import { authRoutes } from "./authRoutes.js";
import { certificateRoutes } from "./certificateRoutes.js";
import { userRoutes } from "./userRoutes.js";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/certificates", certificateRoutes);
