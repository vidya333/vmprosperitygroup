const express = require("express");
const { getProjects, createProject,updateProject, deleteProject, } = require("../controllers/projectController");

const router = express.Router();
const multer = require("multer");
const path = require("path");

// storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET all projects
router.get("/", getProjects);

// POST with images + brochure
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "brochure", maxCount: 1 }
  ]),
  createProject
);

// PUT update project
router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "brochure", maxCount: 1 },
  ]),
  updateProject
);

// DELETE project
router.delete("/:id", deleteProject);

module.exports = router;
