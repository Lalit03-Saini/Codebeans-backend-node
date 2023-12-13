const Team = require('../models/teamModel');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../utils/cloudinary');

const createTeamMember = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Team_member',
        });

        const newTeamMember = new Team({
            s_no: req.body.s_no,
            title: req.body.title,
            linkedin_id: req.body.linkedin_id,
            position: req.body.position,
            order: req.body.order,
            banner_image: result.secure_url,
            cloudinaryPublicId: result.public_id,
        });

        await newTeamMember.save();
        res.status(201).json({ message: 'Team member created successfully' });

    } catch (error) {
        console.error('Error creating team member:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Update a team member by ID
const updateTeamMember = asyncHandler(async (req, res) => {
    try {
        const teamMemberId = req.params.id;

        // Check if a file is uploaded
        let imageUrl = null;
        let cloudinaryPublicId = null;

        if (req.file) {
            // Upload image to Cloudinary in the "Team" folder
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Team',
            });
            imageUrl = result.secure_url;
            cloudinaryPublicId = result.public_id;
        }

        // Find the team member by ID
        const teamMember = await Team.findById(teamMemberId);

        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        // Update team member fields
        teamMember.s_no = req.body.s_no || teamMember.s_no;
        teamMember.title = req.body.title || teamMember.title;
        teamMember.linkedin_id = req.body.linkedin_id || teamMember.linkedin_id;
        teamMember.position = req.body.position || teamMember.position;
        teamMember.order = req.body.order || teamMember.order;
        teamMember.imageUrl = imageUrl || teamMember.imageUrl;
        teamMember.cloudinaryPublicId = cloudinaryPublicId || teamMember.cloudinaryPublicId;

        // Save the updated team member
        await teamMember.save();

        res.json({ message: 'Team member updated successfully' });
    } catch (error) {
        console.error('Error updating team member:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Delete a team member by ID
const deleteTeamMember = asyncHandler(async (req, res) => {
    try {
        const teamMemberId = req.params.id;

        // Find the team member by ID
        const teamMember = await Team.findById(teamMemberId);

        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        // Delete the image from Cloudinary
        if (teamMember.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(teamMember.cloudinaryPublicId);
        }

        // Remove the team member from the database
        await teamMember.remove();

        res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
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

