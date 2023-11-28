const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: email,
            required: true,
        },
    }, { timestamps: true }

);

module.exports = mongoose.model("Newslettersub", newsletterSchema)