const Newslettersub = require("../models/newslettterModel");
const asyncHandler = require("express-async-handler");

const createNewSub = asyncHandler(async (req, res) => {
    try {
        const newSub = await Newslettersub.create(req.body);
        res.status(201).json({
            message: 'Thank you for subscribing to our newsletter!'
        });
        console.log(newSub);
    } catch (error) {
        console.error('Error creating user:', error);

        res.status(500).json({ message: "An error occurred while processing your request. Please try again later." });
    }
});

const updateNewsletterSub = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedNewsletterSub = await Newslettersub.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedNewsletterSub);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

const deleteNewsletterSub = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await Newslettersub.findByIdAndDelete(id);
        res.status(204).json({
            message: "Your Newsletter Subscribe deleted succesfully"
        });
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

const getAllSub = asyncHandler(async (req, res) => {
    try {
        const getallSub = await Newslettersub.find();
        res.status(200).json(getallSub);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

module.exports = { createNewSub, updateNewsletterSub, deleteNewsletterSub, getAllSub };
