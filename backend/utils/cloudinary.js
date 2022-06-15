import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'myfolder',
//     public_id: (req, file) => file.filename,
//   },
// });

// const parser = multer({ storage: storage });

export default cloudinary;
