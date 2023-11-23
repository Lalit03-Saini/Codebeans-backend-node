const { generateRefreshToken } = require("../config/refreshtoken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateToken } = require("../config/jwtToken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


//----Create New User ------//
const createUser = asyncHandler(async (req, res) => {
    /** Get the email from req.body */
    const email = req.body.email;
    // const { fullname, email, password, confirmPassword } = req.body;
    // email = req.body.email;
    /** With the help of email find the user exists or not */
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        /*** TODO:if user not found user create a new user */
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        /***if user found then thow an error: User already exists */
        throw new Error("User Already Exists")
    }
});

// admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Not Authorised");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await User.findByIdAndUpdate(
            findAdmin.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            fullname: findAdmin?.fullname,
            email: findAdmin?.email,
            token: generateToken(findAdmin?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

// Update a user
const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                fullname: req?.body?.fullname,
                email: req?.body?.email,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

//Update User Password 
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
});

//Get all User
const getallUser = asyncHandler(async (req, res) => {
    try {
        const GetallUser = await User.find();
        res.json(GetallUser);
    } catch (error) {
        throw new Error(error);
    }
})

const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const GetaUser = await User.findById(id, req.body);
        res.json(GetaUser);
    } catch (error) {
        throw new Error(error);
    }
})

// logout functionality
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204); // forbidden
});
//delete a user 
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params
    validateMongoDbId(id);
    try {
        const DeleteUser = await User.findByIdAndDelete(id);
        res.send("Your request has been accepted Editorer  will be deleted...")
        res.json(DeleteUser)
    } catch (error) {
        throw new Error(error)
        res.send("Your request has been accepted Project will be deleted...")
    }
})

module.exports = { createUser, loginAdmin, updatedUser, updatePassword, getallUser, getaUser, logout, deleteUser }