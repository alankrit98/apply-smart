const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'applysmart-resumes', // folder in Cloudinary
    allowed_formats: ['pdf'],
    resource_type: 'raw', // for uploading non-image files like PDFs
  },
});

const upload = multer({ storage });

module.exports = upload;
