import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import StallApplication from "./models/StallApplication.js";
import Sponsor from "./models/Sponsor.js";
import GalleryImage from "./models/GalleryImage.js";
import EventSettings from "./models/EventSettings.js";
import Announcement from "./models/Announcement.js";
import Offer from "./models/Offer.js";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected for seeding");
};

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await StallApplication.deleteMany();
    await Sponsor.deleteMany();
    await GalleryImage.deleteMany();
    await EventSettings.deleteMany();
    await Announcement.deleteMany();
    await Offer.deleteMany();

    const admin = await User.create({
      name: "Admin",
      email: "admin@bengalifair.de",
      password: 123456,
      role: "admin",
    });

    const owner = await User.create({
      name: "Rahim Stall Owner",
      email: "owner@bengalifair.de",
      password: 123456,
      role: "stall_owner",
    });

    await EventSettings.create({
      eventName: "Bengali Culture Fair Essen",
      tagline: "Celebrate culture. Support community. Build together.",
      eventDate: "15 August 2026",
      eventTime: "12:00 - 22:00",
      locationName: "Essen, Germany",
      address: "Messeplatz Essen, Germany",
      contactEmail: "info@banglafair.de",
      contactPhone: "+49 176 00000000",
      foodStallPrice: 149,
      regularStallPrice: 99,
      sponsorStartingPrice: 299,
      applicationOpen: true,
      heroImageUrl: "/images/fair-hero.jpg",
      isPublished: true,
    });

    await StallApplication.insertMany([
      {
        owner: owner._id,
        applicantName: "Rahim Uddin",
        email: "rahim@example.com",
        phone: "+49 176 11111111",
        businessName: "Dhaka Biryani House",
        stallType: "food",
        description:
          "Authentic Bengali biryani, kacchi, tehari, chicken roast, and traditional street food.",
        requestedStallSize: "large",
        stallNumber: "F-01",
        status: "approved",
        paymentStatus: "paid",
        amount: 149,
      },
      {
        owner: owner._id,
        applicantName: "Nusrat Akter",
        email: "nusrat@example.com",
        phone: "+49 176 22222222",
        businessName: "Nakshi Fashion",
        stallType: "clothing",
        description:
          "Traditional saree, panjabi, salwar kameez, handloom clothing, and cultural fashion.",
        requestedStallSize: "medium",
        stallNumber: "C-02",
        status: "approved",
        paymentStatus: "paid",
        amount: 99,
      },
      {
        owner: owner._id,
        applicantName: "Samira Khan",
        email: "samira@example.com",
        phone: "+49 176 33333333",
        businessName: "Shonar Bangla Jewelry",
        stallType: "jewelry",
        description:
          "Elegant Bengali-style jewelry, ornaments, wedding accessories, and handmade pieces.",
        requestedStallSize: "small",
        stallNumber: "J-03",
        status: "approved",
        paymentStatus: "pending",
        amount: 99,
      },
      {
        owner: owner._id,
        applicantName: "Tanvir Hasan",
        email: "tanvir@example.com",
        phone: "+49 176 44444444",
        businessName: "Bangla Book Corner",
        stallType: "books",
        description:
          "Bangla books, children’s books, poetry, novels, language-learning materials, and magazines.",
        requestedStallSize: "small",
        stallNumber: "B-04",
        status: "approved",
        paymentStatus: "paid",
        amount: 99,
      },
      {
        owner: owner._id,
        applicantName: "Farhana Islam",
        email: "farhana@example.com",
        phone: "+49 176 55555555",
        businessName: "Mehendi Art Essen",
        stallType: "services",
        description:
          "Professional mehendi, face painting, cultural decoration, and event beauty service.",
        requestedStallSize: "medium",
        stallNumber: "S-05",
        status: "approved",
        paymentStatus: "paid",
        amount: 99,
      },
      {
        owner: owner._id,
        applicantName: "Pending User",
        email: "pending@example.com",
        phone: "+49 176 66666666",
        businessName: "Pending Sweet Stall",
        stallType: "food",
        description:
          "Traditional Bengali sweets including roshogolla, chomchom, mishti doi, and jilapi.",
        requestedStallSize: "medium",
        status: "pending",
        paymentStatus: "unpaid",
        amount: 149,
      },
    ]);

    await Sponsor.insertMany([
      {
        name: "Backpunkt IT Solutions",
        website: "https://backpunkt.de",
        logoUrl: "",
        level: "gold",
        isActive: true,
      },
      {
        name: "Essen Bangla Community",
        website: "",
        logoUrl: "",
        level: "silver",
        isActive: true,
      },
      {
        name: "Deshi Market NRW",
        website: "",
        logoUrl: "",
        level: "bronze",
        isActive: true,
      },
      {
        name: "Culture Partner Germany",
        website: "",
        logoUrl: "",
        level: "partner",
        isActive: true,
      },
    ]);

    await GalleryImage.insertMany([
      {
        title: "Bengali Food Festival",
        caption: "Traditional Bengali food and community moments.",
        imageUrl:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        category: "food",
        isFeatured: true,
        isPublished: true,
      },
      {
        title: "Cultural Celebration",
        caption: "Music, dance, and Bengali cultural performance.",
        imageUrl:
          "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
        category: "culture",
        isFeatured: true,
        isPublished: true,
      },
      {
        title: "Community Gathering",
        caption: "Families and friends celebrating together.",
        imageUrl:
          "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
        category: "community",
        isFeatured: false,
        isPublished: true,
      },
    ]);

    await Announcement.insertMany([
      {
        title: "Stall applications are now open",
        message:
          "Businesses can now apply for food, clothing, service, book, and cultural stalls.",
        type: "stall",
        isPinned: true,
        isPublished: true,
      },
      {
        title: "Sponsor packages available",
        message:
          "Gold, Silver, Bronze, and Partner sponsorship packages are now open.",
        type: "sponsor",
        isPinned: false,
        isPublished: true,
      },
      {
        title: "Event date announced",
        message: "Bengali Culture Fair Essen is planned for 15 August 2026.",
        type: "event",
        isPinned: true,
        isPublished: true,
      },
    ]);

    await Offer.insertMany([
      {
        title: "Early Bird Stall Offer",
        description: "Book your regular stall early and get a discounted rate.",
        offerType: "early_bird",
        originalPrice: 129,
        offerPrice: 99,
        validUntil: "30 June 2026",
        isFeatured: true,
        isPublished: true,
      },
      {
        title: "Food Stall Premium Package",
        description:
          "Large food stall space with premium placement and public listing.",
        offerType: "stall",
        originalPrice: 179,
        offerPrice: 149,
        validUntil: "15 July 2026",
        isFeatured: true,
        isPublished: true,
      },
      {
        title: "Gold Sponsor Package",
        description:
          "Logo placement, website visibility, sponsor listing, and event promotion.",
        offerType: "sponsor",
        originalPrice: 499,
        offerPrice: 399,
        validUntil: "15 July 2026",
        isFeatured: true,
        isPublished: true,
      },
    ]);

    console.log("✅ Seed data inserted successfully");
    console.log("Admin login:");
    console.log("Email: admin@bengalifair.de");
    console.log("Password: 123456");

    process.exit();
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedData();
