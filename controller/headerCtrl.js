const Header = require("../models/headerModel");
const asyncHandler = require("express-async-handler");

//---------------Create a header Option -------------/
const createheaderopt = asyncHandler(async (req, res) => {
    try {
        const newheaderopt = await Header.create(req.body);
        res.status(201).json(newheaderopt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//-------Puting Update in Header Option with it's id-------//
const Updateheaderopt = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateheaderopt = await Header.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(201).json(updateheaderopt);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the header option." });
    }
});

//---------Deleting Header Option with it's id ---------//
const deleteheaderopt = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const Deleteheaderopt = await Header.findByIdAndDelete(id, req.body, {
            new: true
        });
        res.json(Deleteheaderopt);
    } catch (error) {
        throw new Error("Ohh! Thare is Problem", error)
    }
});

//-----------------Get all Header Option-----------------//
const getallheaderopt = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of posts to fetch per page
        const skip = (page - 1) * perPage;
        //Calculate the total number of posts
        const totalHeaderCount = await Header.countDocuments();
        //Calculate the number of pages 
        const totalPages = Math.ceil(totalHeaderCount / perPage);
        //Set a custom header "X-Total-Pages" to transmit the total number of pages
        res.setHeader("X-Total-Pages", totalPages);
        console.log(totalPages)
        const GetAllHeaderopt = await Header.find()
            .sort('s_no')
            .skip(skip)
            .limit(perPage);

        res.status(201).json(GetAllHeaderopt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});


module.exports = { createheaderopt, Updateheaderopt, deleteheaderopt, getallheaderopt };