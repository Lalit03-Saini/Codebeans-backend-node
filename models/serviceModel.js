const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        heading: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        banner_image: {
            type: String,
            required: true,
        },
        sub_heading: {
            type: String,
            required: true,
        },
        sub_description: {
            type: String,
            required: true,
        },
        point_heading: {
            type: String,
            required: true,
        },
        point_heading1: {
            type: String,
            required: true,
        },
        point_heading2: {
            type: String,
        },
        point_heading3: {
            type: String,
        },
        point_heading4: {
            type: String,
        },
        point_heading5: {
            type: String,
        },
        point_description: {
            type: String,
            required: true,
        },
        point_description1: {
            type: String,
            required: true,
        },
        point_description2: {
            type: String,
        },
        point_description3: {
            type: String,
        },
        point_description4: {
            type: String,
        },
        point_description5: {
            type: String,
        },
    }, { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Service", serviceSchema);
