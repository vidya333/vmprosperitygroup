const fs = require("fs");
const path = require("path");
const Media = require("../models/mediaModel");

exports.uploadMedia = async (req, res) => {
  try {
    const fileType = req.file.mimetype.startsWith("video") ? "video" : "image";

    const newMedia = new Media({
      type: fileType,
      src: `/uploads/${req.file.filename}`,
    });

    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🚀 NEW: Delete media
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    // Delete the physical file too
    const filePath = path.join(__dirname, "..", media.src);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    res.json({ message: "Media deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
