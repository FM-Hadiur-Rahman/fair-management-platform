import express from "express";
import {
  createStallApplication,
  getPublicApprovedStalls,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  updatePaymentStatus,
  deleteApplication,
} from "../controllers/stallController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/public", getPublicApprovedStalls);

router.post("/apply", protect, createStallApplication);
router.get("/my-applications", protect, getMyApplications);

router.get("/admin/all", protect, adminOnly, getAllApplications);
router.patch("/admin/:id/status", protect, adminOnly, updateApplicationStatus);
router.patch("/admin/:id/payment", protect, adminOnly, updatePaymentStatus);
router.delete("/admin/:id", protect, adminOnly, deleteApplication);

export default router;
