const { createLogo, updatewebsitelogo, getwebsiteLogo } = require("../controller/websitelogCtrl");
const express = require("express");
const router = express.Router();

router.post("/", createLogo);
router.put("/:id", updatewebsitelogo);
router.get("/all", getwebsiteLogo);

module.exports = router;