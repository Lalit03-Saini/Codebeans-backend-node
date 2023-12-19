const express = require("express");
const { createPartner, updatePartner, deletePartner, getallPartner } = require("../controller/partnerCtrl");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post("/", upload.single('image'), createPartner);
router.put("/:id", upload.single('image'), updatePartner);
router.get("/all", getallPartner);
router.delete("/:id", deletePartner);
module.exports = router;