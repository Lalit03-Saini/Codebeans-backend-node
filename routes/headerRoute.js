const express = require("express");
const { createheaderopt, Updateheaderopt, deleteheaderopt, getallheaderopt } = require("../controller/headerCtrl");
const router = express.Router();

router.post("/", createheaderopt);
router.put("/:id", Updateheaderopt);
router.get("/all", getallheaderopt);
router.delete("/:id", deleteheaderopt);
module.exports = router;