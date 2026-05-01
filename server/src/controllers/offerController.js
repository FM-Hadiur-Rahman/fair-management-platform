import Offer from "../models/Offer.js";

export const createOffer = async (req, res) => {
  const {
    title,
    description,
    offerType,
    originalPrice,
    offerPrice,
    validUntil,
    isFeatured,
    isPublished,
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }

  const offer = await Offer.create({
    title,
    description,
    offerType,
    originalPrice,
    offerPrice,
    validUntil,
    isFeatured,
    isPublished,
  });

  res.status(201).json({
    success: true,
    message: "Offer created successfully",
    offer,
  });
};

export const getPublicOffers = async (req, res) => {
  const offers = await Offer.find({ isPublished: true }).sort({
    isFeatured: -1,
    createdAt: -1,
  });

  res.json({
    success: true,
    count: offers.length,
    offers,
  });
};

export const getAllOffersAdmin = async (req, res) => {
  const offers = await Offer.find().sort({
    isFeatured: -1,
    createdAt: -1,
  });

  res.json({
    success: true,
    count: offers.length,
    offers,
  });
};

export const updateOffer = async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    return res.status(404).json({
      success: false,
      message: "Offer not found",
    });
  }

  const fields = [
    "title",
    "description",
    "offerType",
    "originalPrice",
    "offerPrice",
    "validUntil",
    "isFeatured",
    "isPublished",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      offer[field] = req.body[field];
    }
  });

  await offer.save();

  res.json({
    success: true,
    message: "Offer updated successfully",
    offer,
  });
};

export const deleteOffer = async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    return res.status(404).json({
      success: false,
      message: "Offer not found",
    });
  }

  await offer.deleteOne();

  res.json({
    success: true,
    message: "Offer deleted successfully",
  });
};
