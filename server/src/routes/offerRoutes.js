import express from "express";

import {
  createOffer,
  getPublicOffers,
  getAllOffersAdmin,
  updateOffer,
  deleteOffer,
} from "../controllers/offerController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPublicOffers);

router.post("/admin", protect, adminOnly, createOffer);
router.get("/admin/all", protect, adminOnly, getAllOffersAdmin);
router.patch("/admin/:id", protect, adminOnly, updateOffer);
router.delete("/admin/:id", protect, adminOnly, deleteOffer);

export default router;
