import { v2 as cloudinary } from 'cloudinary';

// Make Cloudinary optional - only configure if credentials exist
let isCloudinaryConfigured = false;

if (process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  isCloudinaryConfigured = true;
  console.log('Cloudinary configured successfully');
} else {
  console.log('Cloudinary not configured - using local storage');
}

export { cloudinary, isCloudinaryConfigured };
export default cloudinary;
