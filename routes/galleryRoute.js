const express = require("express");
const { createGallery, deleteGallery, getAllImages } = require("../controller/galleryCtrl");
const router = express.Router();

router.post("/", createGallery);
router.delete("/:id", deleteGallery);
router.get("/all", getAllImages);
module.exports = router;