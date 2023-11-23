const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const dbConnect = () => {
    try {
        const connection = mongoose.connect((process.env.MONGO_URL));
        console.log("Database Connected Successfuly")
    } catch (error) {
        console.log(error, "Database Failded to Connect")
    }
};

module.exports = dbConnect;