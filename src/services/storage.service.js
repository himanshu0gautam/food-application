import ImageKit from "imagekit";
import dotenv from "dotenv";
import { model } from "mongoose";

dotenv.config();

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  const result = await imagekit.upload({
    file : file,
    fileName : fileName 
  })

  return result;
}

export default  uploadFile 
