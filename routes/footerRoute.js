const express = require("express");
const { createfooterlist, Updatefooterlist, deletefooterlist, getallfooterlist } = require('../controller/footlistCtrl');
const router = express.Router();

router.post("/", createfooterlist);
router.put("/:id", Updatefooterlist);
router.delete("/:id", deletefooterlist);
router.get("/all", getallfooterlist);

module.exports = router;