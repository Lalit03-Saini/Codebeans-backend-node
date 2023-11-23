const Websitelog = require("../models/websitelogModel");
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const path = require("path");

//Storage configuration for multer
const storage = multer.diskStorage({
    destination: './CB-Frontend/public',
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + ext;
        callback(null, fileName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Increase the limit to 10MB (or any desired size)
}).single('image');

//Createing website logo
const createLogo = asyncHandler(async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: "Failed to upload image. Please select an image file under 5MB." });
            }

            const logo = req.file.filename;// Get the uploaded file name
            const newWebLogo = new Websitelog({ logo: logo });
            await newWebLogo.save();
            res.status(201).json({ message: "Website Logo has been successfully saved." });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//Update website Logo
const updatewebsitelogo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const Updatewebsitelogo = await Websitelog.findById(id);
        if (!Updatewebsitelogo) {
            return res.status(404).json({ message: "Logo was not found" });
        }
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    error: 'Please select an image file or select less than 5MB.'
                })
            }
            if (req.file) {
                Updatewebsitelogo.logo = req.file.filename;
            }
            //Save the updated Website Logo 
            await Updatewebsitelogo.save();
            res.json({
                message: 'WebSite Logo updated successfully..'
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

//Get website Logo
const getwebsiteLogo = asyncHandler(async (req, res) => {
    try {
        const weblogo = await Websitelog.find();
        res.json(weblogo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = { createLogo, updatewebsitelogo, getwebsiteLogo };