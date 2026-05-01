import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import stallRoutes from "./routes/stallRoutes.js";
import sponsorRoutes from "./routes/sponsorRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import eventSettingsRoutes from "./routes/eventSettingsRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Bengali Culture Fair Essen API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/stalls", stallRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/settings", eventSettingsRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/offers", offerRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
