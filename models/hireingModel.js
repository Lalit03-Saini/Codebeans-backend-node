const mongoose = require("mongoose");

const hiringSchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        heading: {
            type: String,
            required: true,
        },
        job_description: {
            type: String,
            required: true,
        },
        experience_skills: {
            type: String,
            required: true,
        },
        qualifications: {
            type: String,
            required: true,
        },
        workingplace: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }

);

module.exports = mongoose.model("Hiring", hiringSchema);