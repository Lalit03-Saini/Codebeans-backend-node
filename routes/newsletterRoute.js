const express = require("express");
const router = express.Router();

const { createNewSub, updateNewsletterSub, deleteNewsletterSub, getAllSub } = require("../controller/newslettersubCtrl");

router.post("/", createNewSub);
router.put("/:id", updateNewsletterSub);
router.delete("/:id", deleteNewsletterSub);
router.get("/all", getAllSub);

module.exports = router;