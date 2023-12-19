const Gallery = require("../models/galleryModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

//Create New Gallery Image
const createGallery = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Gallery',
        });
        fs.unlinkSync(req.file.path);

        const newGallery = new Gallery({
            s_no: req.body.s_no,
            gallery_image: result.secure_url,
            cloudinaryPublicId: result.public_id,
        });

        await newGallery.save();

        res.status(201).json({ message: "Gallery image has been successfully saved." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

// Delete Gallery Photo with id 
const deleteGallery = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const Deletegallery = await Gallery.findByIdAndDelete(id);
        if (!Deletegallery) {
            return res.status(404).json({ message: "Gallery image ID not found." });
        }
        res.status(200).json({ message: "Gallery image has been successfully deleted." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

// Get all gallery images
const getAllImages = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of posts to fetch per page
        const skip = (page - 1) * perPage;
        //Calculate the total number of posts
        const totalGalleryCount = await Gallery.countDocuments();
        //Calculate the number of pages
        const totalPages = Math.ceil(totalGalleryCount / perPage);
        // Set a custom header "X-Total-Pages" to transmit the total number of pages
        res.setHeader("X-Total-Pages", totalPages);
        const allImages = await Gallery.find()
            .sort('s_no')
            .skip(skip)
            .limit(perPage);
        res.json(allImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = { createGallery, deleteGallery, getAllImages };
