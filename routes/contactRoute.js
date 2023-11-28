const express = require("express");
const router = express.Router();

const { CreatenewUser, UpdateaUser, Deleteauser, Getall } = require("../controller/contactCtrl");

router.post("/", CreatenewUser);
router.put("/:id", UpdateaUser);
router.delete("/:id", Deleteauser);
router.get("/all", Getall);

module.exports = router;
