const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        gallery_image: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);