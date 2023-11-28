const express = require("express");
const router = express.Router();

const { createnewsub, Updatenewslettersub, Deletenewslettersub, getallsub } = require("../controller/newslettersubCtrl");

router.post("/", createnewsub);
router.put("/:id", Updatenewslettersub);
router.delete("/:id", Deletenewslettersub);
router.get("/all", getallsub);

module.exports = router;