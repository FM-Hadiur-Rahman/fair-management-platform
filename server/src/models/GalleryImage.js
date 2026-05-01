import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    caption: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["culture", "food", "stalls", "community", "sponsors", "other"],
      default: "other",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);

export default GalleryImage;
