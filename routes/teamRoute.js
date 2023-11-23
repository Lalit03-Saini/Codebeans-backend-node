const express = require("express");
const { createTeamMember, updateTeamMember, deleteTeamMember, getAllTeamMembers } = require("../controller/teamCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createTeamMember);
router.put("/:id", updateTeamMember);
router.delete("/:id", deleteTeamMember);
router.get("/all", getAllTeamMembers);
module.exports = router;