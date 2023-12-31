const Team = require('../models/teamModel');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const createTeamMember = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Team_member',
        });
        // Delete the local file after uploading to Cloudinary
        fs.unlinkSync(req.file.path);

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
        const teamMember = await Team.findById(teamMemberId);

        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        // Delete existing image from Cloudinary if it exists
        if (teamMember.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(teamMember.cloudinaryPublicId);
        }

        // Check if a file is uploaded
        let imageUrl = teamMember.banner_image;
        let cloudinaryPublicId = teamMember.cloudinaryPublicId;

        if (req.file) {
            // Upload image to Cloudinary in the "Team_member" folder
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Team_member',
            });
            imageUrl = result.secure_url;
            cloudinaryPublicId = result.public_id;
            // Delete the local file after uploading to Cloudinary
            fs.unlinkSync(req.file.path);
        }

        // Update team member fields
        teamMember.s_no = req.body.s_no || teamMember.s_no;
        teamMember.title = req.body.title || teamMember.title;
        teamMember.linkedin_id = req.body.linkedin_id || teamMember.linkedin_id;
        teamMember.position = req.body.position || teamMember.position;
        teamMember.order = req.body.order || teamMember.order;
        teamMember.banner_image = imageUrl || teamMember.banner_image;
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

        // Delete the image from Cloudinary if it exists
        if (teamMember.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(teamMember.cloudinaryPublicId);
        }

        // Remove the team member from the database
        await teamMember.deleteOne();

        res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Get all team members
const getAllTeamMembers = asyncHandler(async (req, res) => {
    try {
        const teamMembers = await Team.find()
            .sort('s_no')
        res.json(teamMembers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});

module.exports = { createTeamMember, updateTeamMember, deleteTeamMember, getAllTeamMembers };

