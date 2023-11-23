const express = require("express");
const router = express.Router();

const { createBlog, deleteBlog, UpdateBlog, GetaBlog, GetAllBlog } = require("../controller/blogCtrl");

router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", UpdateBlog);
router.get("/all", GetAllBlog);
router.get("/:id", GetaBlog);


module.exports = router;