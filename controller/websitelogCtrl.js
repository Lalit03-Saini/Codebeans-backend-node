const Websitelog = require("../models/websitelogModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// Create website logo
const createLogo = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'website_logo',
        });
        fs.unlinkSync(req.file.path);

        const newWebLogo = new Websitelog({
            logo: result.secure_url,
            cloudinaryPublicId: result.public_id,
        });

        await newWebLogo.save();

        res.status(201).json({ message: "Website Logo has been successfully saved." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

// Update website Logo
const updateWebsiteLogo = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        let imageUrl = null;
        let cloudinaryPublicId = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'website_logo'
            });
            imageUrl = result.secure_url;
            cloudinaryPublicId = result.public_id;
        }

        const webLogo = await Websitelog.findById(id);

        if (!webLogo) {
            return res.status(404).json({ success: false, message: 'Website Logo not found' });
        }

        webLogo.imageUrl = imageUrl || webLogo.imageUrl;
        webLogo.cloudinaryPublicId = cloudinaryPublicId || webLogo.cloudinaryPublicId;

        await webLogo.save();
        res.json({ success: true, message: 'Website Logo updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: `An error occurred: ${error.message}` });
    }
});

// Get website Logo
const getWebsiteLogo = asyncHandler(async (req, res) => {
    try {
        const weblogo = await Websitelog.findOne();
        res.json({ success: true, data: weblogo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = { createLogo, updateWebsiteLogo, getWebsiteLogo };
