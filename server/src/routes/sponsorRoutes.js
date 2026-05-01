import express from "express";

import {
  createSponsor,
  getSponsors,
  getAllSponsorsAdmin,
  updateSponsor,
  deleteSponsor,
} from "../controllers/sponsorController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getSponsors);

router.post("/admin", protect, adminOnly, createSponsor);
router.get("/admin/all", protect, adminOnly, getAllSponsorsAdmin);
router.patch("/admin/:id", protect, adminOnly, updateSponsor);
router.delete("/admin/:id", protect, adminOnly, deleteSponsor);

export default router;
