const express = require("express");
const { CreateFaq, UpdateFaq, DeleteFaQ, GetallFaQ } = require("../controller/faqCtrl");
const router = express.Router();

router.post("/", CreateFaq);
router.put("/:id", UpdateFaq);
router.delete("/:id", DeleteFaQ);
router.get("/all", GetallFaQ);

module.exports = router;