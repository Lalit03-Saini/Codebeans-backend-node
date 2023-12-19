const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            Required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmPassword: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return this.password === v;
                },
                message: props => `The passwords do not match.`
            }
        },
        role: {
            type: String,
            default: "editor",
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to compare password and confirmPassword before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    if (this.password !== this.confirmPassword) {
        throw new Error("Password and confirmPassword do not match");
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined; // Remove confirmPassword from the document
    next();
});

// Method to compare entered password with the hashed password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to create a password reset token
userSchema.method.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resettoken)
        .digest("hex")
    this.passwordResetExpires = Data.now() + 30 * 60 * 1000; //10 minutes
    return resettoken;
};

//Export the model
module.exports = mongoose.model("cbadmins", userSchema);