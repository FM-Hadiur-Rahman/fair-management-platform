import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      default: "",
    },

    logoUrl: {
      type: String,
      default: "",
    },

    level: {
      type: String,
      enum: ["gold", "silver", "bronze", "partner"],
      default: "partner",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

export default Sponsor;
