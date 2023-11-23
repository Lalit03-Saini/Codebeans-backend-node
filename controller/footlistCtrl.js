const Footerlist = require("../models/footerModel");
const asynHandler = require("express-async-handler");

//---------Create a Footer ------//
const createfooterlist = asynHandler(async (req, res) => {
    try {
        const newfooterlist = await Footerlist.create(req.body);
        res.status(201).json(newfooterlist);
    } catch (error) {
        console.log.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//---------Update a Footerlist with it's id -------/
const Updatefooterlist = asynHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatefooterlist = await Footerlist.findByIdAndUpdate(id, req.body, { new: true, });
        res.status(201).json(updatefooterlist);
    } catch (error) {
        console.log.error(error);
        res.status(500).json({ error: "An error occurred while updating the header option." });
    }
});

//-------Deleting a Footerlist with it's id ----- //
const deletefooterlist = asynHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const Deletefooterlist = await Footerlist.findByIdAndDelete(id, req.body, { new: true });
        res.status(201).json(Deletefooterlist);
    } catch (error) {
        console.log.error(error);
        res.status(500).json({ error: "An error occurred while updating the header option." });
    }
});

//-----Get all Footerlist -----------//
const getallfooterlist = asynHandler(async (req, res) => {
    try {
        const GetAllFooterlist = await Footerlist.find()
        res.status(201).json(GetAllFooterlist);
    } catch (error) {
        console.log.error(error);
        res.status(500).json({ error: "An error occurred while updating the header option." });
    }
});

module.exports = { createfooterlist, Updatefooterlist, deletefooterlist, getallfooterlist };