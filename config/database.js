const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
  try {
    mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.log(error)
    console.log('Error in connecting to MongoDB')
    process.exit(1)
  }
}

module.exports = connectDB