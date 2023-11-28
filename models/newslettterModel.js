// const mongoose = require("mongoose");

// const newsletterSchema = new mongoose.Schema(
//     {
//         email: {
//             type: email,
//             required: true,
//         },
//     }, { timestamps: true }

// );

// module.exports = mongoose.model("Newslettersub", newsletterSchema)

const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true, // Ensures uniqueness of the email field
            lowercase: true, // Stores email addresses in lowercase
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Regex match for email format
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Newslettersub", newsletterSchema);
