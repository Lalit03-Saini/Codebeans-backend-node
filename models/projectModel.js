const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        imagePaths: [
            {
                type: String,
            },
        ]
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Project", projectSchema);