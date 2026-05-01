import mongoose from "mongoose";

const stallApplicationSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    applicantName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    stallType: {
      type: String,
      enum: ["food", "clothing", "jewelry", "books", "services", "other"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requestedStallSize: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "small",
    },

    stallNumber: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "pending", "paid"],
      default: "unpaid",
    },

    amount: {
      type: Number,
      default: 0,
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    logoUrl: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const StallApplication = mongoose.model(
  "StallApplication",
  stallApplicationSchema,
);

export default StallApplication;
