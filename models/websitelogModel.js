const mongoose = require("mongoose");

const websitelogo = new mongoose.Schema(
    {
        logo: {
            type: String,
            required: true,
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Logo", websitelogo);