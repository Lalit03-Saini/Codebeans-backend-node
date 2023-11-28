const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures uniqueness of the email field
            lowercase: true, // Stores email addresses in lowercase
            match: [/\S+@\S+\.\S+/, 'Invalid email format'], // Regex match for email format
            validate: {
                validator: function (v) {
                    return /\S+@\S+\.\S+/.test(v); // Custom validator for email format
                },
                message: 'Invalid email format',
            },
        },
        mobile: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v); // Validates that mobile is a 10-digit number
                },
                message: 'Invalid mobile number format (should be a 10-digit number)',
            },
        },
        city: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("ContactUslist", contactUsSchema);
