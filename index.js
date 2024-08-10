// import express and dotenv
const express = require('express');
const app = express();
require('dotenv').config();
const fileupload = require('express-fileupload');


// import functions
const connectDB = require('./config/database');
const connectCloudinary = require('./config/cloudinary');

// port
const PORT = process.env.PORT || 5000;  // 5000 is the default port

// middlewares
app.use(express.json())
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

// connections
connectDB();
connectCloudinary();

// routes
const Upload = require('./routes/FileUpload')
app.use('/api/v1/upload', Upload)

// server
app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT}`);
})