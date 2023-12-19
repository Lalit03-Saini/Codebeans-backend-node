const Partner = require("../models/partnerModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

//---------Createing a new Partner-------------//
const createPartner = asyncHandler(async (req, res) => {
    try {
        // Handle file upload
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Partner_images',
        });
        fs.unlinkSync(req.file.path);

        const newPartner = new Partner({
            s_no: req.body.s_no,
            link: req.body.link,
            partner_image: result.secure_url,
            cloudinaryPublicId: result.public_id,
        });

        // Save the team member to the database
        await newPartner.save();
        res.status(201).json({ message: 'Team member created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

const updatePartner = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;

        // Check if a file is uploaded
        let imageUrl = null;
        let cloudinaryPublicId = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload
                (req.file.path, {
                    folder: 'Partner_images',
                });
            imageUrl = result.secure_url;
            cloudinaryPublicId = result.public_id;
        }

        const partner = await Partner.findById(id);
        // Handle file upload if a new image is provided
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: 'Please select an image file or select less than 5MB.' });
            }
            partner.s_no = req.body.s_no || partner.s_no;
            partner.link = req.body.link || partner.link;
            partner.imageUrl = imageUrl || partner.imageUrl;
            partner.cloudinaryPublicId = cloudinaryPublicId || partner.cloudinaryPublicId;

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
    try {
        const id = req.params.id;
        const deletedPartner = await Partner.findById(id);
        if (!deletedPartner) {
            return res.status(404).json({ error: 'Partner not found' });
        }

        // Delete the image from Cloudinary
        if (deletedPartner.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(teamMember.cloudinaryPublicId);
        }

        await deletedPartner.remove();
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
