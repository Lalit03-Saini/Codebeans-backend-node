const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

//----------Create new User------------//
const CreatenewUser = asyncHandler(async (req, res) => {
    try {
        const createauser = await Contact.create(req.body);
        res.status(200).json({
            message: 'Thank you for contacting us. We will get back to you soon!'
        });
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//---------Update a Contact User-------//
const UpdateaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateuser = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//-------Delete a Contact User-----//
const Deleteauser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteauser = await Contact.findByIdAndDelete(id, req.body, { new: true });
        res.status(201).json(deleteauser);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//-------getall all Contact User----//
const Getall = asyncHandler(async (req, res) => {
    try {
        const getallcontact = await Contact.find();
        res.status(201).json(getallcontact);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

module.exports = { CreatenewUser, UpdateaUser, Deleteauser, Getall };