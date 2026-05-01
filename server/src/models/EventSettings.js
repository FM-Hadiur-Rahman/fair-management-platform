import mongoose from "mongoose";

const eventSettingsSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      default: "Bengali Culture Fair Essen",
    },

    tagline: {
      type: String,
      default: "Celebrate culture. Support community. Build together.",
    },

    eventDate: {
      type: String,
      default: "Coming Soon",
    },

    eventTime: {
      type: String,
      default: "Coming Soon",
    },

    locationName: {
      type: String,
      default: "Essen, Germany",
    },

    address: {
      type: String,
      default: "",
    },

    contactEmail: {
      type: String,
      default: "info@banglafair.de",
    },

    contactPhone: {
      type: String,
      default: "",
    },

    foodStallPrice: {
      type: Number,
      default: 0,
    },

    regularStallPrice: {
      type: Number,
      default: 0,
    },

    sponsorStartingPrice: {
      type: Number,
      default: 0,
    },

    applicationOpen: {
      type: Boolean,
      default: true,
    },

    heroImageUrl: {
      type: String,
      default: "",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const EventSettings = mongoose.model("EventSettings", eventSettingsSchema);

export default EventSettings;
