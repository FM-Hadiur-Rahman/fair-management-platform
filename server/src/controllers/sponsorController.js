import Sponsor from "../models/Sponsor.js";

export const createSponsor = async (req, res) => {
  const { name, website, logoUrl, level } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Sponsor name is required",
    });
  }

  const sponsor = await Sponsor.create({
    name,
    website,
    logoUrl,
    level,
  });

  res.status(201).json({
    success: true,
    message: "Sponsor created successfully",
    sponsor,
  });
};

export const getSponsors = async (req, res) => {
  const sponsors = await Sponsor.find({ isActive: true }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    count: sponsors.length,
    sponsors,
  });
};

export const getAllSponsorsAdmin = async (req, res) => {
  const sponsors = await Sponsor.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: sponsors.length,
    sponsors,
  });
};

export const updateSponsor = async (req, res) => {
  const sponsor = await Sponsor.findById(req.params.id);

  if (!sponsor) {
    return res.status(404).json({
      success: false,
      message: "Sponsor not found",
    });
  }

  const { name, website, logoUrl, level, isActive } = req.body;

  if (name !== undefined) sponsor.name = name;
  if (website !== undefined) sponsor.website = website;
  if (logoUrl !== undefined) sponsor.logoUrl = logoUrl;
  if (level !== undefined) sponsor.level = level;
  if (isActive !== undefined) sponsor.isActive = isActive;

  await sponsor.save();

  res.json({
    success: true,
    message: "Sponsor updated successfully",
    sponsor,
  });
};

export const deleteSponsor = async (req, res) => {
  const sponsor = await Sponsor.findById(req.params.id);

  if (!sponsor) {
    return res.status(404).json({
      success: false,
      message: "Sponsor not found",
    });
  }

  await sponsor.deleteOne();

  res.json({
    success: true,
    message: "Sponsor deleted successfully",
  });
};
