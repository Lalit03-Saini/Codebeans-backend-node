const express = require("express");
const { createProject, updateProject, deleteProject, Getaproject, getAllProjects } = require("../controller/projectCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// router.post("/", authMiddleware, isAdmin, createProject);
router.post("/", createProject);
router.put("/:id", updateProject);
router.get("/all", getAllProjects);
router.get("/:id", Getaproject);
router.delete("/:id", deleteProject);

module.exports = router;