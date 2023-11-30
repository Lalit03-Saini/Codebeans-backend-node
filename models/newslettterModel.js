// const mongoose = require("mongoose");

// const newsletterSchema = new mongoose.Schema(
//     {
//         subemail: {
//             type: String,
//             required: true,
//             unique: true, // Ensures uniqueness of the email field
//             lowercase: true, // Stores email addresses in lowercase
//             match: [/\S+@\S+\.\S+/, 'Invalid email format'], // Regex match for email format
//             validate: {
//                 validator: function (v) {
//                     return /\S+@\S+\.\S+/.test(v); // Custom validator for email format
//                 },
//                 message: 'Invalid email format',
//             },
//         },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Newslettersub", newsletterSchema);


const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
    {
        subemail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, 'Invalid email format'],
            validate: {
                validator: function (v) {
                    return /\S+@\S+\.\S+/.test(v);
                },
                message: 'Invalid email format',
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Newslettersub", newsletterSchema);
