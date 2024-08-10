const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

// local file upload -> handler function
const localFileUpload = async (req, res) => {
  try {
    // file fetch
    const file = req.files.file;
    console.log("File uploaded",file);

    // ceate a path for the file to be stored on the server
    let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
    console.log("path ->",path);

    // move the file to the path
    file.mv(path, async (err) => {
      console.log(err)
    })
      
    // create a new file object
    res.status(200).json({
      sucess: true,
      message: 'File uploaded successfully'
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
    console.error(error);
  }
}


function isFileTypeSupported(type,supportedTypes){
  return supportedTypes.includes(type);
}

async function uploadToCloudinary(file,folder,quality){
  try {
    const options = {folder}
    if(quality){
      options.quality = quality;
    }
    console.log("Temp file path",file.tempFilePath);
    options.resource_type="auto";
    const uploadedFile = await cloudinary.uploader.upload(file.tempFilePath, options);
    return uploadedFile;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// image upload handler
const imageUpload = async (req, res) => {
  try {
    // data fetch
    const {name,tags,email} = req.body;
    console.log(name,tags,email)

    const file = req.files.imageFile
    console.log(file)

    // validation
    const supportedTypes = ["jpg","jpeg","png","gif"];
    const fileType=file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(fileType,supportedTypes)){
      return res.status(400).json({
        success: false,
        message: "File type not supported"
      })
    }

    // file format is supported ->upload to cloudinary
    const uploadedFile = await uploadToCloudinary(file,"Codehelp");
    console.log(uploadedFile);
    // save data in mongodb

    // m-1
    // const fileData = new File({
    //   name: name,
    //   tags: tags,
    //   email: email,
    //   imageUrl: uploadedFile.secure_url
    // })
    // await fileData.save();

    // m-2
    const fileData = await File.create({
      name: name,
      tags: tags,
      email: email,
      imageUrl: uploadedFile.secure_url
    })
    console.log(fileData);

    res.status(200).json({
      success:true,
      imageUrl: uploadedFile.secure_url,
      message: "Image uploaded successfully",
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}




// video upload handler
const videoUpload = async (req, res) => {
  try {
    // data fetch
    const {name,tags,email} = req.body;
    console.log(name,tags,email)

    const file = req.files.videoFile
    console.log(file)

    // validation
    const supportedTypes = ["mp4","mov"];
    const fileType=file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(fileType,supportedTypes)){
      return res.status(400).json({
        success: false,
        message: "File type not supported"
      })
    }

    // file format is supported ->upload to cloudinary
    const uploadedFile = await uploadToCloudinary(file,"Codehelp");
    console.log(uploadedFile);
    // save data in mongodb

    const fileData = await File.create({
      name: name,
      tags: tags,
      email: email,
      videoUrl: uploadedFile.secure_url
    })
    console.log(fileData);

    res.status(200).json({
      success:true,
      video: uploadedFile.secure_url,
      message: "Video uploaded successfully",
    })

  } catch (error) {
    console.error(error)
    res.status(400).json({
      success: false,
      message: "Something went wrong"
    })
  }
}


// image file reducer handler
const imageSizeReducer = async (req, res) => {
  try {
    // data fetch
    const {name,tags,email} = req.body;
    console.log(name,tags,email)

    const file = req.files.imageFile
    console.log(file)

    // validation
    const supportedTypes = ["jpg","jpeg","png","gif"];
    const fileType=file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(fileType,supportedTypes)){
      return res.status(400).json({
        success: false,
        message: "File type not supported"
      })
    }

    // file format is supported ->upload to cloudinary
    const uploadedFile = await uploadToCloudinary(file,"Codehelp",20);
    console.log(uploadedFile);
    // save data in mongodb

    const fileData = await File.create({
      name: name,
      tags: tags,
      email: email,
      imageUrl: uploadedFile.secure_url
    })
    console.log(fileData);

    res.status(200).json({
      success:true,
      imageUrl: uploadedFile.secure_url,
      message: "Image uploaded successfully",
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}

module.exports = {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageSizeReducer
}