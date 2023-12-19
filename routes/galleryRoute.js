const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { createGallery, deleteGallery, getAllImages } = require("../controller/galleryCtrl");
const router = express.Router();

router.post("/", upload.single('image'), createGallery);
router.delete("/:id", deleteGallery);
router.get("/all", getAllImages);
module.exports = router;