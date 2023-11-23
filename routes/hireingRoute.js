const express = require("express");
const { Createjob, Updatejob, deletejob, getalljob } = require("../controller/hireingCtrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", Createjob);
router.put("/:id", Updatejob);
router.delete("/:id", deletejob);
router.get("/all", getalljob);
module.exports = router;