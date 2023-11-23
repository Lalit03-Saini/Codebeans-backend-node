const Team = require('../models/teamModel');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './CB-Frontend/public/assets/images/team',
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

// Create a new team member with a banner image
const createTeamMember = asyncHandler(async (req, res) => {
    try {
        // Handle file upload
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: 'Please select an image file or select less then 5MB.' });
            }

            if (!req.body.title || !req.body.linkedin_id || !req.body.position) {
                return res.status(400).json({ error: 'Please provide all required fields.' });
            }
            const newTeamMember = new Team({
                s_no: req.body.s_no,
                title: req.body.title,
                linkedin_id: req.body.linkedin_id,
                position: req.body.position,
                order: req.body.order,
                banner_image: req.file.filename, // Store only the image link
            });

            // Save the team member to the database
            await newTeamMember.save();

            res.status(201).json({ message: 'Team member created successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

// Update a team member by ID
const updateTeamMember = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        // Find the team member by ID
        const teamMember = await Team.findById(id);

        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found.' });
        }

        // Handle file upload if a new image is provided
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: 'Please select an image file or select less than 5MB.' });
            }
            // Update the team member's details
            if (req.body.s_no) {
                teamMember.s_no = req.body.s_no;
            }
            if (req.body.title) {
                teamMember.title = req.body.title;
            };
            if (req.body.linkedin_id) {
                teamMember.linkedin_id = req.body.linkedin_id;
            }
            if (req.body.position) {
                teamMember.position = req.body.position;
            }
            if (req.body.order) {
                teamMember.order = req.body.order;
            }
            if (req.file) {
                // If a new image is uploaded, update the partner_image property
                teamMember.banner_image = req.file.filename;
            }


            // Save the updated team member
            await teamMember.save();

            res.json({ message: 'Team member updated successfully.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});

// Delete a team member by ID
const deleteTeamMember = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTeamMember = await Team.findByIdAndDelete(id);

        if (!deletedTeamMember) {
            return res.status(404).json({ message: 'Team member not found.' });
        }

        res.json({ message: 'Team member deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});

// Get all team members
const getAllTeamMembers = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10; // Number of posts to fetch per page
        const skip = (page - 1) * perPage;
        //Calculate the total number of posts
        const totalTeamCount = await Team.countDocuments();
        //Calculate the number of pages
        const totalPages = Math.ceil(totalTeamCount / perPage);
        // Set a custom header "X-Total-Pages" to transmit the total number of pages
        res.setHeader("X-Total-Pages", totalPages);
        const teamMembers = await Team.find()
            .sort('s_no')
            .skip(skip)
            .limit(perPage);;
        res.json(teamMembers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});

module.exports = { createTeamMember, updateTeamMember, deleteTeamMember, getAllTeamMembers };

