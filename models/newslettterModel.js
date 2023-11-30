const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
    {
        subemail: {
            type: String,
            required: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Newslettersub", newsletterSchema);
