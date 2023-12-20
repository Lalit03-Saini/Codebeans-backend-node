const Blog = require("../models/blogModel");
const asyncHandler = require('express-async-handler');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// Creating Blog
const createBlog = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Blog',
        });
        fs.unlinkSync(req.file.path);

        if (uploadResult.error) {
            return res.status(400).json({ error: "Failed to upload the main image to Cloudinary." });
        }

        // Validate required fields
        const requiredFields = ['s_no', 'title', 'blogdetail', 'heading', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'headingdetail', 'headingdetail1', 'headingdetail2', 'headingdetail3', 'headingdetail4', 'headingdetail5'];
        if (requiredFields.some(field => !req.body[field])) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // Upload images to Cloudinary
        const imageUrls = [];
        for (let i = 1; i <= 5; i++) {
            if (req.files[`image${i}`]) {
                const result = await cloudinary.uploader.upload(req.files[`image${i}`][0].path);
                imageUrls.push(result.secure_url);
                fs.unlinkSync(req.files[`image${i}`][0].path);
            }
        }

        const newBlog = new Blog({
            s_no: req.body.s_no,
            title: req.body.title,
            blogdetail: req.body.blogdetail,
            heading: req.body.heading,
            heading1: req.body.heading1,
            heading2: req.body.heading2,
            heading3: req.body.heading3,
            heading4: req.body.heading4,
            heading5: req.body.heading5,
            headingdetail: req.body.headingdetail,
            headingdetail1: req.body.headingdetail1,
            headingdetail2: req.body.headingdetail2,
            headingdetail3: req.body.headingdetail3,
            headingdetail4: req.body.headingdetail4,
            headingdetail5: req.body.headingdetail5,
            imagePaths: imageUrls,
            cloudinaryPublicId: imageUrls.public_id,
        });

        await newBlog.save();

        res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

// Update a Blog with id
const UpdateBlog = asyncHandler(async (req, res) => {
    const id = req.params.id; // Get the blog post ID from the request parameters

    try {
        // Attempt to find the existing blog post by its ID
        const updatedBlog = await Blog.findById(id);

        // If the blog post with the specified ID is not found, return a 404 response
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found..." });
        }

        // Use the 'upload' middleware to handle file uploads
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: "Please select image files (up to 5) with a total size less than 5MB." });
            }
            if (req.body.s_no) {
                updatedBlog.s_no = req.body.s_no;
            }
            // ... (update other fields)

            // Delete old images from Cloudinary
            if (req.body.deleteImages && req.body.deleteImages.length > 0) {
                for (let imageName of req.body.deleteImages) {
                    // Delete the image from Cloudinary using its public ID
                    await cloudinary.uploader.destroy(imageName);
                }
            }

            // Upload new images to Cloudinary
            const newImageUrls = [];
            for (let i = 1; i <= 5; i++) {
                if (req.files[`image${i}`]) {
                    const result = await cloudinary.uploader.upload(req.files[`image${i}`][0].path);
                    newImageUrls.push(result.secure_url);
                }
            }

            // Update the imagePaths if new images are uploaded
            if (newImageUrls.length > 0) {
                updatedBlog.imagePaths = newImageUrls;
            }

            // Save the updated blog post to the database
            await updatedBlog.save();

            // Return a success response
            res.json({ message: 'Blog updated successfully' });
        });
    } catch (error) {
        // If there's an error during the update process, return a 500 Internal Server Error response
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

// Deleting a Blog with id
const deleteBlog = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        // Delete associated image files from Cloudinary
        for (let imagePath of deletedBlog.imagePaths) {
            // Extract the public ID from the image URL
            const publicId = imagePath.split('/').pop().split('.')[0];
            // Delete the image from Cloudinary using its public ID
            await cloudinary.uploader.destroy(publicId);
        }

        res.json({ message: 'Blog and associated images have been deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});

//getting a Blog with id
const GetaBlog = asyncHandler(async (req, res) => {
    const id = req.params.id //Get the blog post ID from the request parameters
    try {
        const getablog = await Blog.findById(id)
        res.json(getablog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Getting all Blog with pagination
const GetAllBlog = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of posts to fetch per page
        const skip = (page - 1) * perPage;
        //Calculate the total number of posts
        const totalBlogCount = await Blog.countDocuments();
        //Calculate the number of pages
        const totalPages = Math.ceil(totalBlogCount / perPage);
        // Set a custom header "X-Total-Pages" to transmit the total number of pages
        res.setHeader("X-Total-Pages", totalPages);
        console.log(totalPages);
        const allBlog = await Blog.find()
            .sort('s_no')
            .skip(skip)
            .limit(perPage);

        res.json(allBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = { createBlog, UpdateBlog, GetAllBlog, GetaBlog, deleteBlog };
