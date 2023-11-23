const mongoose = require("mongoose");

const bodyscript = new mongoose.Schema(
    {
        script: {
            type: String,
            required: true,
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("BodyScript", bodyscript);