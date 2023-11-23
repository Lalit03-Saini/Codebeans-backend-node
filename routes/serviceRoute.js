const express = require("express");
const { createService, UpdatedService, deleteService, GetAllservice } = require("../controller/serviceCtrl");
const router = express.Router();

router.post("/", createService);
router.put("/:id", UpdatedService);
router.delete("/:id", deleteService);
router.get("/all", GetAllservice);
module.exports = router;