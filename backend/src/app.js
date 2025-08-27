const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const { PORT } = require("./config/serverConfig");
const { DATABASE_URL } = require("./config/serverConfig");

// Models
const Gallery = require("./models/Gallery");

// API Routes
app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
});

// Gallery APIs
app.get("/api/galleries", async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch galleries" });
  }
});

app.get("/api/galleries/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    res.json(gallery);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

app.post("/api/galleries", async (req, res) => {
  try {
    const newGallery = new Gallery(req.body);
    await newGallery.save();
    res.status(201).json({ message: "Gallery created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create gallery" });
  }
});

app.delete("/api/galleries/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete gallery" });
  }
});

// DATABASE CONNECTION
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Database connected successfully 🚀"))
  .catch((err) => console.log("Failed to connect database:", err));

// SERVER RUNNER
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
