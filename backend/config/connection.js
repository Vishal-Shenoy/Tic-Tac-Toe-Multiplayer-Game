const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.URI);
        console.log("database connected");
    } catch (err) {
        console.log(err);
    }
};
module.exports = connectDB;