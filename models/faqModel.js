const mongoose = require("mongoose");

const FaQSchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("FaQ", FaQSchema);