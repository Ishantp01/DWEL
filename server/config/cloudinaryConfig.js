import cloudinaryModule from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'taskFiles', // Folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'pdf', 'docx'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
