const express = require("express");
const { createTestimonial, updateTestimonial, deleteTestimonial, getAllTestimonials } = require("../controller/testimonialCtrl");
const router = express.Router();

router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);
router.get("/all", getAllTestimonials);
module.exports = router;