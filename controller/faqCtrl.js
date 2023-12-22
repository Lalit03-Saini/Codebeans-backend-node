const FaQ = require("../models/faqModel");
const asyncHandler = require("express-async-handler");

//-----------------Createing New Faq------------------//
const CreateFaq = asyncHandler(async (req, res, next) => {
    try {
        const newfaqqus = await FaQ.create(req.body);
        res.json(newfaqqus)
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the error-handling middleware
    }
});

//-----------------Update Faq------------------//
const UpdateFaq = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatefaq = await FaQ.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatefaq);
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the error-handling middleware
    }
});

//------------------Deleteing Faq----------------------//
const DeleteFaQ = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleteFaQ = await FaQ.findByIdAndDelete(id)
        res.json(deleteFaQ)
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the error-handling middleware
    }
});

//------------------Geting all faq-------------------//
const GetallFaQ = asyncHandler(async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of to fetch per page
        const skip = (page - 1) * perPage;
        //Calculate the total number of posts
        const totalFaQCount = await FaQ.countDocuments();
        //Calculate the number of pages
        const totalPages = Math.ceil(totalFaQCount / perPage);
        // Set a custom header "X-Total-Pages" to transmit the total number of pages
        res.setHeader("X-Total-Pages", totalPages);
        const getallfaq = await FaQ.find()
            .sort('s_no')
            .skip(skip)
            .limit(perPage);
        res.json(getallfaq);
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the error-handling middleware
    }
});

module.exports = { CreateFaq, UpdateFaq, DeleteFaQ, GetallFaQ }

