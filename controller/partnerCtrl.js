const Partner = require("../models/partnerModel");
const multer = require('multer');
const asyncHandler = require("express-async-handler");
const path = require("path");

const storage = multer.diskStorage({
    destination: './CB-Frontend/public/assets/images/partner',
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + ext;
        callback(null, fileName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (adjust as needed)
}).single('image'); // Use 'image' as the field name for file upload
// Create a new partner with a banner image

//---------Createing a new Partner-------------//
const createPartner = asyncHandler(async (req, res) => {
    try {
        // Handle file upload
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: 'Please select an image file or select less then 5MB.' });
            }

            if (!req.body.link || !req.body.s_no) {
                return res.status(400).json({ error: 'Please provide all required fields.' });
            }
            const newPartner = new Partner({
                s_no: req.body.s_no,
                link: req.body.link,
                partner_image: req.file.filename, // Store only the image link
            });

            // Save the team member to the database
            await newPartner.save();

            res.status(201).json({ message: 'Team member created successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

const updatePartner = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const partner = await Partner.findById(id);

        if (!partner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        // Handle file upload if a new image is provided
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: 'Please select an image file or select less than 5MB.' });
            }
            if (req.body.s_no) {
                partner.s_no = req.body.s_no;
            }
            if (req.body.link) {
                partner.link = req.body.link;
            }

            if (req.file) {
                // If a new image is uploaded, update the partner_image property
                partner.partner_image = req.file.filename;
            }

            // Save the updated Partner's details
            await partner.save();

            res.json({ message: 'Partner updated successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//---------Delete a Partner with id-------------//
const deletePartner = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPartner = await Partner.findByIdAndDelete(id);
        if (!deletedPartner) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        res.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//---------Get all Partner with id-------------//
const getallPartner = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of posts to fetch per page
        const skip = (page - 1) * perPage;
        //Calculate the total number of posts
        const totalPartnerCount = await Partner.countDocuments();
        //Calculate the number of pages
        const totalPages = Math.ceil(totalPartnerCount / perPage);
        // Set a custom header "X-Total-Pages" to transmit the total number of pages
        res.setHeader("X-Total-Pages", totalPages);
        const allPartners = await Partner.find()
            .sort('s_no')
            .skip(skip)
            .limit(perPage);;
        res.json(allPartners);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

module.exports = { createPartner, updatePartner, deletePartner, getallPartner };
