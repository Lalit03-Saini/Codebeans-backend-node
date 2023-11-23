const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
    {
        s_no: {
            type: Number,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        partner_image: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Partner", partnerSchema);