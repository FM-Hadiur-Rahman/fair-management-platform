import express from "express";

import {
  createGalleryImage,
  getPublicGalleryImages,
  getAllGalleryImagesAdmin,
  updateGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPublicGalleryImages);

router.post("/admin", protect, adminOnly, createGalleryImage);
router.get("/admin/all", protect, adminOnly, getAllGalleryImagesAdmin);
router.patch("/admin/:id", protect, adminOnly, updateGalleryImage);
router.delete("/admin/:id", protect, adminOnly, deleteGalleryImage);

export default router;
