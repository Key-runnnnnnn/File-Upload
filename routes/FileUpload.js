const express = require('express');
const router = express.Router();

const {localFileUpload,imageUpload,videoUpload,imageSizeReducer} = require('../controllers/fileUpload');


router.post('/image', imageUpload);
router.post('/video', videoUpload);
router.post('/image-size-reducer', imageSizeReducer);
router.post('/local-file', localFileUpload);

module.exports = router;