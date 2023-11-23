const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            require: true,
        },
        banner_image: {
            type: String,
            required: true,
        },
        linkedin_id: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Team", teamSchema);


