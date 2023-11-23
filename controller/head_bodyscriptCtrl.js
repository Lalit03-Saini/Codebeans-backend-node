const HeadScript = require("../models/headscript");
const BodyScript = require("../models/bodyscript");
const asyncHandler = require("express-async-handler");

//--------------Head script start here -----------//
//create head script
const createheadscript = asyncHandler(async (req, res) => {
    try {
        const newbodyscript = await HeadScript.create(req.body);
        res.status(201).json(newbodyscript);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//Update head script
const Updateheadscript = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        const updateheadscript = await HeadScript.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateheadscript);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the head script" });
    }
});

//Deleteing head script
const Deleteheadscript = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deleteheadscript = await HeadScript.findByIdAndDelete(id, req.body, { new: true });
        res.status(201).json(deleteheadscript);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` })
    }
});

//get all Head script
const getallheadscript = asyncHandler(async (erq, res) => {
    try {
        const Getallheadscript = await HeadScript.find();
        res.status(201).json(Getallheadscript);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` })
    }
});
//---------------Head script end Here-------------//
//--------------Body script start here------------//
//Create body script
const createbodyscript = asyncHandler(async (req, res) => {
    try {
        const newbodyscript = await BodyScript.create(req.body);
        res.status(201).json(newbodyscript);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//Update head script
const Updatebodyscript = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        const updatebodyscript = await BodyScript.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updatebodyscript);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the head script" });
    }
});

//Deleteing head script
const Deletebodyscript = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deleteheadscript = await BodyScript.findByIdAndDelete(id, req.body, { new: true });
        res.status(201).json(deleteheadscript);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` })
    }
});

//get all Head script
const getallbodyhscript = asyncHandler(async (erq, res) => {
    try {
        const Getallbodyscript = await BodyScript.find();
        res.status(201).json(Getallbodyscript);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` })
    }
});
//---------------Body script end here-------------//

module.exports = { createheadscript, createbodyscript, Updateheadscript, Updatebodyscript, Deleteheadscript, Deletebodyscript, getallheadscript, getallbodyhscript }