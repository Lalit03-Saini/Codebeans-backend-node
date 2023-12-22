const Project = require("../models/projectModel");
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const path = require("path");

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: "./CB-Frontend/public/assets/images/project",
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + ext;
    callback(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (adjust as needed)
  fileFilter: (req, file, callback) => {
    // Validate file type (e.g., allow only images)
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new Error("Only image files are allowed."), false);
    }
  },
}).fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 }
])

// Create a new Project with multiple images
const createProject = asyncHandler(async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async function (err) {
      if (err) {
        return res
          .status(400)
          .json({ error: "Please select image files (up to 5) with a total size less than 5MB." });
      }

      if (!req.body.title || !req.body.link || !req.body.s_no) {
        return res.status(400).json({ error: "Please provide all required fields." });
      }

      const imageUrls = [];
      for (let i = 1; i <= 5; i++) {
        if (req.files[`image${i}`]) {
          imageUrls.push(req.files[`image${i}`][0].filename);
        }
      }
      const newProject = new Project({
        s_no: req.body.s_no,
        title: req.body.title,
        link: req.body.link,
        imagePaths: imageUrls, // Store the image file paths in the array
      });

      await newProject.save();
      res.status(201).json({ message: "Project successfully created." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
});

// Update a Project by ID (including images)
const updateProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProject = await Project.findById(id);
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Handle file upload and text data update in a single request
    upload(req, res, async function (err) {
      if (err) {
        return res
          .status(400)
          .json({ error: "Please select image files (up to 5) with a total size less than 5MB." });
      }

      // Update the specific fields that are provided in the request body
      if (req.body.s_no) {
        updatedProject.s_no = req.body.s_no;
      }
      if (req.body.title) {
        updatedProject.title = req.body.title;
      }
      if (req.body.link) {
        updatedProject.link = req.body.link;
      }

      const imageUrls = [];
      for (let i = 1; i <= 5; i++) {
        if (req.files[`image${i}`]) {
          imageUrls.push(req.files[`image${i}`][0].filename);
        }
      }

      if (imageUrls.length > 0) {
        updatedProject.imagePaths = imageUrls;
      }

      // Save the updated Project post
      await updatedProject.save();

      res.json({ message: "Project has been successfully updated." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
});

// Delete a Project by ID
const deleteProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Delete associated image files
    const imageDir = path.join(__dirname, 'CB-Frontend/public/assets/images/project');
    deletedProject.imagePaths.forEach((imagePath) => {
      const fullPath = path.join(imageDir, imagePath);
      try {
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log(`Deleted file: ${fullPath}`);
        } else {
          console.warn(`File not found: ${fullPath}`);
        }
      } catch (err) {
        console.error(`Error deleting file: ${fullPath}`, err);
      }
    });

    res.json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//Get a Single Project with id 
const Getaproject = asyncHandler(async (req, res) => {
  const id = req.params.id; // Get the Project post ID from the request parameters
  try {
    const getaProject = await Project.findById(id)
    res.json(getaProject);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get all Projects
const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10; // Number of posts to fetch per page
    const skip = (page - 1) * perPage;
    //Calculate the total number of posts
    const totalProjectCount = await Project.countDocuments();
    //Calculate the number of pages
    const totalPages = Math.ceil(totalProjectCount / perPage);
    // Set a custom header "X-Total-Pages" to transmit the total number of pages
    res.setHeader("X-Total-Pages", totalPages);
    const allProjects = await Project.find()
      .sort('s_no')
      .skip(skip)
      .limit(perPage);
    res.json(allProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = { createProject, updateProject, deleteProject, Getaproject, getAllProjects };
