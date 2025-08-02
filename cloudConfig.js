const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary (v2)
cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDE_APY_KEY,
  api_secret: process.env.CLOUDE_API_SECRET
});

// Custom Multer storage engine for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'Wanderlust_dev',
      allowed_formats: ["jpg", "webp", "jpeg"],
     
      resource_type: 'auto' // 'image', 'video', 'raw'
    },
});

module.exports= {
    cloudinary,
    storage

}
