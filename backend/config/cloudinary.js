import { v2 as cloudinary } from "cloudinary";

console.log("Cloudinary Config Debug:");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

const connectCloudinary = () => {

      if (!process.env.CLOUDINARY_API_SECRET) {
            throw new Error("CLOUDINARY_API_SECRET is not defined. Check your .env file.");
      }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("Cloudinary Configurations Done");
};

export default connectCloudinary;
