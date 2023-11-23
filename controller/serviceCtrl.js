const Service = require("../models/serviceModel");
const multer = require("multer");
const asyncHandler = require('express-async-handler');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: "./CB-Frontend/public/assets/images/service",
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + ext;
        callback(null, fileName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (adjust as needed)
}).single("image"); // Use 'image' as the field name for file upload

// Create a new Service with a banner Image
const createService = asyncHandler(async (req, res) => {
    try {
        // Handle file upload
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: "Please select an image file or select less than 5MB." });
            }

            const { s_no, heading, description, sub_heading, sub_description, point_heading, point_heading1, point_description, point_description1, } = req.body;

            if (!s_no || !heading || !description || !sub_heading || !sub_description || !point_heading || !point_heading1 || !point_description || !point_description1) {
                return res.status(400).json({ error: 'Please provide all required fields.' });
            }

            const newService = new Service({
                s_no, heading, description, sub_heading, sub_description, point_heading, point_heading1, point_description, point_description1, banner_image: req.file.filename, // Store only the image link
            });

            await newService.save();

            res.status(201).json({ message: "New Service created successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

// Updaeting a services
const UpdatedService = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        // Find the Service by its id
        const updateService = await Service.findById(id);

        if (!updateService) {
            return res.status(404).json({ message: 'This Service section not found...' });
        }

        // Handle file upload (if an image is included)
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: 'Please select an image file or select less than 5MB.' });
            }

            // Update service fields from form data
            updateService.s_no = req.body.s_no || updateService.s_no;
            updateService.heading = req.body.heading || updateService.heading;
            updateService.description = req.body.description || updateService.description;
            updateService.sub_heading = req.body.sub_heading || updateService.sub_heading;
            updateService.sub_description = req.body.sub_description || updateService.sub_description;
            updateService.point_heading = req.body.point_heading || updateService.point_heading;
            updateService.point_heading1 = req.body.point_heading1 || updateService.point_heading1;
            updateService.point_description = req.body.point_description || updateService.point_description;
            updateService.point_description1 = req.body.point_description1 || updateService.point_description1;

            if (req.file) {
                // Update the image if a new one was uploaded
                updateService.banner_image = req.file.filename;
            }

            // Save the updated Service post
            await updateService.save();
            console.log(updateService);
            res.json({ message: 'Service updated successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});


// Delete a service by its id
const deleteService = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found.' });
        }

        res.json({ message: 'Service deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});

// Get all services
const GetAllservice = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of posts to fetch per page
        const skip = (page - 1) * perPage;
        //Calculate the total number of posts
        const totalServiceCount = await Service.countDocuments();
        //Calculate the number of pages
        const totalPages = Math.ceil(totalServiceCount / perPage);
        // Set a custom header "X-Total-Pages" to transmit the total number of pages
        res.setHeader("X-Total-Pages", totalPages);
        const allServices = await Service.find()
            .sort('s_no')
            .skip(skip)
            .limit(perPage);
        res.json(allServices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
})

module.exports = { createService, UpdatedService, deleteService, GetAllservice };
