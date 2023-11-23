const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        blogdetail: {
            type: String,
            required: true,
        },
        heading: {
            type: String,
            required: true,
        },
        headingdetail: {
            type: String,
            required: true,
        },
        heading1: {
            type: String,
            required: true,
        },
        headingdetail1: {
            type: String,
            required: true,
        },
        heading2: {
            type: String,
            required: true,
        },
        headingdetail2: {
            type: String,
            required: true,
        },
        heading3: {
            type: String,
            required: false,
        },
        headingdetail3: {
            type: String,
            required: false,
        },
        heading4: {
            type: String,
            required: false,
        },
        headingdetail4: {
            type: String,
            required: false,
        },
        heading5: {
            type: String,
            required: false,
        },
        headingdetail5: {
            type: String,
            required: false,
        },
        imagePaths: [
            {
                type: String,
            },
        ]
    },
    { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Blog", blogSchema);