const express = require("express");
const { createPartner, updatePartner, deletePartner, getallPartner } = require("../controller/partnerCtrl");
const router = express.Router();

router.post("/", createPartner);
router.put("/:id", updatePartner);
router.get("/all", getallPartner);
router.delete("/:id", deletePartner);
module.exports = router;