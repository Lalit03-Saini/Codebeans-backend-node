const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        feedback: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);