// import ImageKit from "imagekit";
import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv";
import { model } from "mongoose";

dotenv.config();

// export const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// async function uploadFile(file, fileName) {
//   const result = await imagekit.upload({
//     file : file,
//     fileName : fileName 
//   })

//   return result;
// }

export { cloudinary };
