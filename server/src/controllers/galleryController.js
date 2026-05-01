import GalleryImage from "../models/GalleryImage.js";

export const createGalleryImage = async (req, res) => {
  const { title, caption, imageUrl, category, isFeatured, isPublished } =
    req.body;

  if (!title || !imageUrl) {
    return res.status(400).json({
      success: false,
      message: "Title and imageUrl are required",
    });
  }

  const image = await GalleryImage.create({
    title,
    caption,
    imageUrl,
    category,
    isFeatured,
    isPublished,
  });

  res.status(201).json({
    success: true,
    message: "Gallery image created successfully",
    image,
  });
};

export const getPublicGalleryImages = async (req, res) => {
  const images = await GalleryImage.find({ isPublished: true }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    count: images.length,
    images,
  });
};

export const getAllGalleryImagesAdmin = async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: images.length,
    images,
  });
};

export const updateGalleryImage = async (req, res) => {
  const image = await GalleryImage.findById(req.params.id);

  if (!image) {
    return res.status(404).json({
      success: false,
      message: "Gallery image not found",
    });
  }

  const { title, caption, imageUrl, category, isFeatured, isPublished } =
    req.body;

  if (title !== undefined) image.title = title;
  if (caption !== undefined) image.caption = caption;
  if (imageUrl !== undefined) image.imageUrl = imageUrl;
  if (category !== undefined) image.category = category;
  if (isFeatured !== undefined) image.isFeatured = isFeatured;
  if (isPublished !== undefined) image.isPublished = isPublished;

  await image.save();

  res.json({
    success: true,
    message: "Gallery image updated successfully",
    image,
  });
};

export const deleteGalleryImage = async (req, res) => {
  const image = await GalleryImage.findById(req.params.id);

  if (!image) {
    return res.status(404).json({
      success: false,
      message: "Gallery image not found",
    });
  }

  await image.deleteOne();

  res.json({
    success: true,
    message: "Gallery image deleted successfully",
  });
};
