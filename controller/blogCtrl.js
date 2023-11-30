const Blog = require("../models/blogModel");
const multer = require('multer');
const asyncHandler = require("express-async-handler");
const path = require('path');

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: './CB-Frontend/public/assets/images/blog',
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + ext;
        callback(null, fileName);
    },
});

// Configure multer to handle image uploads for five different fields
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith("image/")) {
            callback(null, true);
        } else {
            callback(new Error("Only image files are allowed."), false);
        }
    }
}).fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 }
]);

// Creating Blog
const createBlog = asyncHandler(async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: "Please select image files (up to 5) with a total size less than 5MB." });
            }
            if (!req.body.s_no || !req.body.title || !req.body.blogdetail || !req.body.heading || !req.body.heading1 || !req.body.heading2 || !req.body.headingdetail || !req.body.headingdetail1 || !req.body.headingdetail2) {
                return res.status(400).json({ error: 'Please provide all required fields.' });
            }
            const imageUrls = [];
            for (let i = 1; i <= 5; i++) {
                if (req.files[`image${i}`]) {
                    imageUrls.push(req.files[`image${i}`][0].filename);
                }
            }
            const newBlog = new Blog({
                s_no: req.body.s_no,
                title: req.body.title,
                blogdetail: req.body.blogdetail,
                heading: req.body.heading,
                heading1: req.body.heading1,
                heading2: req.body.heading2,
                headingdetail: req.body.headingdetail,
                headingdetail1: req.body.headingdetail1,
                headingdetail2: req.body.headingdetail2,
                imagePaths: imageUrls,
            });
            await newBlog.save();
            res.status(201).json({ message: 'Blog created successfully' });
        });
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

        // Use the 'upload' middleware to handle file uploads, similar to the create code

        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: "Please select image files (up to 5) with a total size less than 5MB." });
            }
            if (req.body.s_no) {
                updatedBlog.s_no = req.body.s_no;
            }
            if (req.body.title) {
                updatedBlog.title = req.body.title;
            }
            if (req.body.blogdetail) {
                updatedBlog.blogdetail = req.body.blogdetail;
            }
            if (req.body.heading) {
                updatedBlog.heading = req.body.heading;
            }
            if (req.body.heading1) {
                updatedBlog.heading1 = req.body.heading1;
            }
            if (req.body.heading2) {
                updatedBlog.heading2 = req.body.heading2;
            }
            if (req.body.headingdetail) {
                updatedBlog.headingdetail = req.body.headingdetail;
            }
            if (req.body.headingdetail1) {
                updatedBlog.headingdetail1 = req.body.headingdetail1;
            }
            if (req.body.headingdetail2) {
                updatedBlog.headingdetail2 = req.body.headingdetail2;
            }

            // Only update the imagePaths if new images are uploaded
            const imageUrls = [];
            for (let i = 1; i <= 5; i++) {
                if (req.files[`image${i}`]) {
                    imageUrls.push(req.files[`image${i}`][0].filename);
                }
            }

            if (imageUrls.length > 0) {
                updatedBlog.imagePaths = imageUrls;
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

        // Delete associated image files
        const imageDir = path.join(__dirname, 'CB-Frontend/public/assets/images/blog');
        deletedBlog.imagePaths.forEach((imagePath) => {
            const fullPath = path.join(imageDir, imagePath);
            try {
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                    console.log(`Deleted file: ${fullPath}`);
                } else {
                    console.warn(`File not found: ${fullPath}`);
                }
            } catch (err) {
                console.error(`Error deleting file: ${fullPath}`, err);
            }
        });

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
