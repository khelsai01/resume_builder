const mongoose = require("mongoose");
require('dotenv').config();



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log('mongodb connection error',error.message)
    }
}

module.exports =connectDB