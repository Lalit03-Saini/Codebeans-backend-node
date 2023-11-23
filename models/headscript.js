const mongoose = require("mongoose");

const headScript = new mongoose.Schema({
    script: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("HeadScript", headScript);
