import EventSettings from "../models/EventSettings.js";

const getOrCreateSettings = async () => {
  let settings = await EventSettings.findOne();

  if (!settings) {
    settings = await EventSettings.create({});
  }

  return settings;
};

export const getPublicEventSettings = async (req, res) => {
  const settings = await getOrCreateSettings();

  res.json({
    success: true,
    settings,
  });
};

export const getAdminEventSettings = async (req, res) => {
  const settings = await getOrCreateSettings();

  res.json({
    success: true,
    settings,
  });
};

export const updateEventSettings = async (req, res) => {
  const settings = await getOrCreateSettings();

  const fields = [
    "eventName",
    "tagline",
    "eventDate",
    "eventTime",
    "locationName",
    "address",
    "contactEmail",
    "contactPhone",
    "foodStallPrice",
    "regularStallPrice",
    "sponsorStartingPrice",
    "applicationOpen",
    "heroImageUrl",
    "isPublished",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      settings[field] = req.body[field];
    }
  });

  await settings.save();

  res.json({
    success: true,
    message: "Event settings updated successfully",
    settings,
  });
};
