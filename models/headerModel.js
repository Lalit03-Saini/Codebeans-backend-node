const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        option: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Header", headerSchema);