import StallApplication from "../models/StallApplication.js";

export const createStallApplication = async (req, res) => {
  const {
    applicantName,
    email,
    phone,
    businessName,
    stallType,
    description,
    requestedStallSize,
  } = req.body;

  if (
    !applicantName ||
    !email ||
    !phone ||
    !businessName ||
    !stallType ||
    !description
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  const application = await StallApplication.create({
    owner: req.user?._id,
    applicantName,
    email,
    phone,
    businessName,
    stallType,
    description,
    requestedStallSize,
  });

  res.status(201).json({
    success: true,
    message: "Stall application submitted successfully",
    application,
  });
};

export const getPublicApprovedStalls = async (req, res) => {
  const stalls = await StallApplication.find({ status: "approved" }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    count: stalls.length,
    stalls,
  });
};

export const getMyApplications = async (req, res) => {
  const applications = await StallApplication.find({
    owner: req.user._id,
  }).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: applications.length,
    applications,
  });
};

export const getAllApplications = async (req, res) => {
  const applications = await StallApplication.find()
    .populate("owner", "name email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: applications.length,
    applications,
  });
};

export const updateApplicationStatus = async (req, res) => {
  const { status, stallNumber, amount, rejectionReason } = req.body;

  const application = await StallApplication.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  if (status) application.status = status;
  if (stallNumber !== undefined) application.stallNumber = stallNumber;
  if (amount !== undefined) application.amount = amount;
  if (rejectionReason !== undefined)
    application.rejectionReason = rejectionReason;

  await application.save();

  res.json({
    success: true,
    message: "Application updated successfully",
    application,
  });
};

export const updatePaymentStatus = async (req, res) => {
  const { paymentStatus } = req.body;

  const application = await StallApplication.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  application.paymentStatus = paymentStatus;

  await application.save();

  res.json({
    success: true,
    message: "Payment status updated successfully",
    application,
  });
};

export const deleteApplication = async (req, res) => {
  const application = await StallApplication.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  await application.deleteOne();

  res.json({
    success: true,
    message: "Application deleted successfully",
  });
};
