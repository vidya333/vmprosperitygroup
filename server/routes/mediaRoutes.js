const express = require("express");
const multer = require("multer");
const { uploadMedia, getMedia, deleteMedia } = require("../controllers/mediaController");

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload endpoint
router.post("/upload", upload.single("file"), uploadMedia);

// Fetch all media
router.get("/", getMedia);

// Delete media
router.delete("/:id", deleteMedia);

module.exports = router;
