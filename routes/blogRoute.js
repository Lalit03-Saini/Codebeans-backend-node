const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { createBlog, deleteBlog, UpdateBlog, GetaBlog, GetAllBlog } = require("../controller/blogCtrl");

// Define routes
router.post("/", upload.array('image', 5), createBlog);
router.put("/:id", upload.array('images', 5), UpdateBlog);
router.delete("/:id", deleteBlog);
router.get("/:id", GetaBlog);
router.get("/all", GetAllBlog);

module.exports = router;
