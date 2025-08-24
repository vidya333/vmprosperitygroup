const Project = require("../models/Project");
//GET projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};
//ADD project
exports.createProject = async (req, res) => {
  try {
    const { title, subtitle, description, features, whatsappNumber, email } = req.body;

    // handle features string vs array
    let featuresArray = features;
    if (typeof features === "string") {
      featuresArray = features.split(",").map(f => f.trim());
    }

    // Extract file paths
    const imagePaths = req.files["images"]
      ? req.files["images"].map(file => `/uploads/${file.filename}`)
      : [];

    const brochurePath = req.files["brochure"]
      ? `/uploads/${req.files["brochure"][0].filename}`
      : null;

    const newProject = new Project({
      title,
      subtitle,
      description,
      features: featuresArray,
      images: imagePaths,
      brochure: brochurePath,
      whatsappNumber,
      email,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating project" });
  }
};
// UPDATE project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, features, whatsappNumber, email } = req.body;

    // handle features string vs array
    let featuresArray = features;
    if (typeof features === "string") {
      featuresArray = features.split(",").map(f => f.trim());
    }

    // handle updated images (if new files are uploaded)
    const imagePaths = req.files && req.files["images"]
      ? req.files["images"].map(file => `/uploads/${file.filename}`)
      : undefined;

    const brochurePath = req.files && req.files["brochure"]
      ? `/uploads/${req.files["brochure"][0].filename}`
      : undefined;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        features: featuresArray,
        ...(imagePaths ? { images: imagePaths } : {}),  // update only if new images uploaded
        ...(brochurePath ? { brochure: brochurePath } : {}),
        whatsappNumber,
        email,
      },
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating project" });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting project" });
  }
};