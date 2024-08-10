const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
const transporter = require('../config/email')

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    // required: true
  },
  videoUrl: {
    type: String,
    // required: true
  },
  tags: {
    type: Array,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})


// post save middleware
fileSchema.post('save', async function (doc) {
  try {
    console.log('File saved and sending email');
    console.log(doc);

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "noreply@gmail.com", // sender address
      to: doc.email,
      subject: "File uploaded on Cloudinary", 
      html:`<h2>Hello ${doc.name}, your file has been uploaded successfully.</h2> <br> <p>click below to view </p> <br> ${doc.imageUrl}`,
    });
    console.log("Message sent->", info);
  } catch (error) {
    console.error(error)
  }
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
