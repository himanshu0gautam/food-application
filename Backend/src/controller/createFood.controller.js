import path from "path";
import fs from "fs/promises";
import dishModel from "../model/CreateFood.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../services/storage.service.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const createDish = asyncHandler(async (req, res) => {
  let foodImagepath = null;

  try {
    // const image = req.files || (Array.isArray(req.files) && req.files[0]);
    foodImagepath = req.files?.foodImage[0]?.path
    // const subImagepath = req.files?.SubImage[0]?.path

    if(!foodImagepath){
        throw new ApiError(409,"food image is required" )
    }

    const imageUpload = await uploadOnCloudinary(foodImagepath);
    // const SubimageUpload = await uploadOnCloudinary(subImagepath);

    if(!imageUpload){
        throw new ApiError(400, "imageupload failed")
    }
    console.log("cloud done");

    const dishItem = new dishModel({
      dishName: req.body.dishName,
      dishImage: imageUpload.secure_url,
    //   SubimageUpload: SubimageUpload?.secure_url || "",
      description: req.body.description,
      category: req.body.category,
      typeOfFood: req.body.typeOfFood,
      preprationTime: req.body.preprationTime,
      distance: req.body.distance,
      foodprice: req.body.dishPrice,
      dishHalfPrice: req.body.dishHalfPrice,
      calories: req.body.calories,
    });

    await dishItem.save();

    return res
      .status(201)
      .json(new ApiResponse(200, dishItem, "dish created successfully"));
  } catch (error) {
    console.error("Upload error", error);
    return res
      .status(409)
      .json(new ApiResponse(409, error.message, "upload failed"));
  } finally {
    if (foodImagepath) {
      try {
        await fs.unlink(foodImagepath);
        console.log("image delete ho gai");
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.log("delete error", unlinkError.message);
        }
      }
    }
  }
});

const getSaveFood = asyncHandler(async (req, res) => {
  const dishitem = await dishModel.find({});

  res.status(200).json(new ApiResponse(200, dishitem, "dishItem food fetched successfully"))
})

export { createDish, getSaveFood };
