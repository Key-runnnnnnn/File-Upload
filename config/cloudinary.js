const cloudinary = require('cloudinary').v2
require('dotenv').config();   // This is required to read the .env file

const connectCloudinary = async ()=>{
  try {
     cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key:process.env.API_KEY,
      api_secret:process.env.API_SECRET
     })
      console.log('Cloudinary connected successfully')
  } catch (error) {
    console.error(error)
  }
}

module.exports = connectCloudinary