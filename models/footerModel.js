const mongoose = require("mongoose");

const footerlist = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,
        },
        point1: {
            type: String,
            required: true,
        },
        point_link1: {
            type: String,
            required: true,
        },
        point2: {
            type: String,
            required: true,
        },
        point_link2: {
            type: String,
            required: true,
        },
        point3: {
            type: String,
            required: false,
        },
        point_link3: {
            type: String,
            required: false,
        },
        point4: {
            type: String,
            required: false,
        },
        point_link4: {
            type: String,
            required: false,
        },
        point5: {
            type: String,
            required: false,
        },
        point_link5: {
            type: String,
            required: false,
        },
        point6: {
            type: String,
            required: false,
        },
        point_link6: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Footerlist", footerlist);