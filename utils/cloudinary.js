const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "codebeans0622",
    api_key: "965612634332585",
    api_secret: "HJaPdi4IY_J2TNpOgXE7E5c8Xag",
});

module.exports = cloudinary;
