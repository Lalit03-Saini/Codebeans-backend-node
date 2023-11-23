const express = require("express");
const { createUser, loginAdmin, updatedUser, updatePassword, getallUser, getaUser, logout, deleteUser } = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/admin-login", loginAdmin);
router.get("/all", getallUser);
router.get("/:id", getaUser);
router.patch("/update", authMiddleware, updatedUser);
router.patch("/updatepassword", authMiddleware, updatePassword);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.get("/logout", logout);

module.exports = router;