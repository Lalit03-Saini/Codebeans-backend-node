const Testimonial = require("../models/testimonialModel");
const asyncHandler = require("express-async-handler");

// Create a new testimonial
const createTestimonial = asyncHandler(async (req, res) => {
    try {
        const newTestimonial = await Testimonial.create(req.body);
        res.status(201).json({ message: 'Testimonial created successfully', newTestimonial });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

// Update a testimonial by its ID
const updateTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedTestimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
});

// Delete a testimonial by its ID
const deleteTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
});

// Get all testimonials
const getAllTestimonials = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of posts to fetch per page
        const skip = (page - 1) * perPage;
        //Calculate the total number of posts
        const totalTestimonialCount = await Testimonial.countDocuments();
        //Calculate the number of pages
        const totalPages = Math.ceil(totalTestimonialCount / perPage);
        // Set a custom header "X-Total-Pages" to transmit the total number of pages
        res.setHeader("X-Total-Pages", totalPages);
        const allTestimonials = await Testimonial.find()
            .sort('s_no')
            .skip(skip)
            .limit(perPage);;
        res.json(allTestimonials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
});

module.exports = { createTestimonial, updateTestimonial, deleteTestimonial, getAllTestimonials };
