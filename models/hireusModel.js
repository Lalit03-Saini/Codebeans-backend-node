const mongoose = require("mongoose");

const hireusSchema = new mongoose.Schema(
    {
        fullname: {
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
        mobileNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v); // Validates that mobile is a 10-digit number
                },
                message: 'Invalid mobile number format (should be a 10-digit number)',
            },
        },
        description: {
            type: String,
            required: true
        },
        cv: {
            data: Buffer, // Binary data for storing the file
            contentType: String, // Mime type of the file
            fileName: String // Original file name
        },
    }, { timestamps: true }
);