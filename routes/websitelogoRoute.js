const { createLogo, updateWebsiteLogo, getWebsiteLogo } = require("../controller/websitelogCtrl");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const express = require("express");
const router = express.Router();

router.post("/", upload.single('image'), createLogo);
router.put("/:id", upload.single('image'), updateWebsiteLogo);
router.get("/all", getWebsiteLogo);

module.exports = router;