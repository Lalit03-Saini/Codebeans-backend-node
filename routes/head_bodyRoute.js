const { createheadscript, createbodyscript, Updateheadscript, Updatebodyscript, Deleteheadscript, Deletebodyscript, getallheadscript, getallbodyhscript } = require("../controller/head_bodyscriptCtrl");
const express = require("express");
const router = express.Router();

router.post("/head", createheadscript);
router.post("/body", createbodyscript);
router.put("/head/:id", Updateheadscript);
router.put("/body/:id", Updatebodyscript);
router.delete("/head/:id", Deleteheadscript);
router.delete("/body/:id", Deletebodyscript);
router.get("/head/all", getallheadscript);
router.get("/body/all", getallbodyhscript);

module.exports = router;