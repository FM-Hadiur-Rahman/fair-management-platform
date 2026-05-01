import express from "express";

import {
  createAnnouncement,
  getPublicAnnouncements,
  getAllAnnouncementsAdmin,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPublicAnnouncements);

router.post("/admin", protect, adminOnly, createAnnouncement);
router.get("/admin/all", protect, adminOnly, getAllAnnouncementsAdmin);
router.patch("/admin/:id", protect, adminOnly, updateAnnouncement);
router.delete("/admin/:id", protect, adminOnly, deleteAnnouncement);

export default router;
