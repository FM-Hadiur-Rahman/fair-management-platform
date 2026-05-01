import Announcement from "../models/Announcement.js";

export const createAnnouncement = async (req, res) => {
  const { title, message, type, isPinned, isPublished } = req.body;

  if (!title || !message) {
    return res.status(400).json({
      success: false,
      message: "Title and message are required",
    });
  }

  const announcement = await Announcement.create({
    title,
    message,
    type,
    isPinned,
    isPublished,
  });

  res.status(201).json({
    success: true,
    message: "Announcement created successfully",
    announcement,
  });
};

export const getPublicAnnouncements = async (req, res) => {
  const announcements = await Announcement.find({ isPublished: true }).sort({
    isPinned: -1,
    createdAt: -1,
  });

  res.json({
    success: true,
    count: announcements.length,
    announcements,
  });
};

export const getAllAnnouncementsAdmin = async (req, res) => {
  const announcements = await Announcement.find().sort({
    isPinned: -1,
    createdAt: -1,
  });

  res.json({
    success: true,
    count: announcements.length,
    announcements,
  });
};

export const updateAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);

  if (!announcement) {
    return res.status(404).json({
      success: false,
      message: "Announcement not found",
    });
  }

  const fields = ["title", "message", "type", "isPinned", "isPublished"];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      announcement[field] = req.body[field];
    }
  });

  await announcement.save();

  res.json({
    success: true,
    message: "Announcement updated successfully",
    announcement,
  });
};

export const deleteAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);

  if (!announcement) {
    return res.status(404).json({
      success: false,
      message: "Announcement not found",
    });
  }

  await announcement.deleteOne();

  res.json({
    success: true,
    message: "Announcement deleted successfully",
  });
};
