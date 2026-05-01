import express from "express";

import {
  getPublicEventSettings,
  getAdminEventSettings,
  updateEventSettings,
} from "../controllers/eventSettingsController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPublicEventSettings);

router.get("/admin", protect, adminOnly, getAdminEventSettings);
router.patch("/admin", protect, adminOnly, updateEventSettings);

export default router;
