const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { createTeamMember, updateTeamMember, deleteTeamMember, getAllTeamMembers } = require("../controller/teamCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Error handling middleware for file upload
router.post("/", upload.single('image'), createTeamMember);
router.put("/:id", upload.single('image'), updateTeamMember);
router.delete("/:id", deleteTeamMember);
router.get("/all", getAllTeamMembers);
module.exports = router;