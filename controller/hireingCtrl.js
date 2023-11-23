const Hiring = require("../models/hireingModel");
const asyncHandler = require("express-async-handler");


//------------Create a Job on Portfoli ----------------//
const Createjob = asyncHandler(async (req, res) => {
    try {
        const newJob = await Hiring.create(req.body);
        res.json(newJob);
    } catch (error) {
        throw new Error("Ohh! There is Problem", error)
    }
});

//-------------Puting Update in Job with it's id----------//
const Updatejob = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateJob = await Hiring.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.send("Your Job Data Has been Updated successfull...")
        res.json(updateJob);
    } catch (error) {
        throw new Error("Ohh! Thare is Problem", error)
    }
});

//---------Deleteing Job detales with it's id------------//
const deletejob = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const DeleteJob = await Hiring.findByIdAndDelete(id, req.body, {
            new: true
        });
        res.send("Your request has been accepted Job will be deleted...")
        res.json(DeleteJob);
    } catch (error) {
        throw new Error("Ohh! Thare is Problem", error)
    }
});

//---------Get all Job detales------------//
const getalljob = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of posts to fetch per page
        const skip = (page - 1) * perPage;
        //Calculate the total number of posts
        const totalHiringCount = await Hiring.countDocuments();
        //Calculate the number of pages
        const totalPages = Math.ceil(totalHiringCount / perPage);
        // Set a custom header "X-Total-Pages" to transmit the total number of pages
        res.setHeader("X-Total-Pages", totalPages);
        const GetAllJob = await Hiring.find()
            .sort('s_no')
            .skip(skip)
            .limit(perPage);;
        res.json(GetAllJob);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { Createjob, Updatejob, deletejob, getalljob }

