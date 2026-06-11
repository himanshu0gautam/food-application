import fs from "fs/promises";
import path from "path";
import commmentModel from "../model/comment.model.js";
import foodModel from "../model/food.model.js";
import likemodel from "../model/like.model.js";
import saveModel from "../model/save.model.js";
import { cloudinary } from "../services/storage.service.js";

async function createFood(req, res) {
  let filePath = null;

  try {
    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    
    if(file?.path){
        filePath = file.path.split(path.sep).join("/")
    }

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const foodUploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "foodModel",
      resource_type: "video",
    });
    console.log("cloud done",file);

    const foodItem = new foodModel({
      foodname: req.body.foodname,
      description: req.body.description,
      foodvideo: foodUploadResult.secure_url,
      foodPartner: req.foodPartner._id,
      category: req.body.category,
      typeOfFood: req.body.typeOfFood,
      preprationTime: req.body.preprationTime,
      foodprice: req.body.foodprice,
      foodpriceHalf: req.body.foodpriceHalf,
      calories: req.body.calories,
    });
    await foodItem.save();

    res.json({
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("upload error:", error);
    return res
      .status(409)
      .json({ message: "Upload failed", error: error.message });
  } finally {
    if (filePath) {
      try {
        await fs.unlink(filePath);
        console.log("file delete ho gai");
      } catch (err) {
        if (err.code !== "ENOENT") {
          console.log("delete error", unlinkError.message);
        }
      }
    }
  }
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "Food item Fetched Successfully",
    foodItems,
  });
}

// like controller
async function likeFoodController(req, res) {
  const { foodId } = req.body;

  const user = req.user;

  const isAlreadyLiked = await likemodel.findOne({
    user: user.id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likemodel.deleteOne({
      user: user._id,
      food: foodId,
    });

    const updated = await foodModel.findByIdAndUpdate(
      foodId,
      { $inc: { likeCount: -1 } },
      { new: true },
    );

    return res.status(200).json({
      like: false,
      likeCount: updated.likeCount,
      message: "Unliked successfully",
    });
  }

  await likemodel.create({
    user: user._id,
    food: foodId,
  });

  const updated = await foodModel.findByIdAndUpdate(
    foodId,
    { $inc: { likeCount: 1 } },
    { new: true },
  );

  return res.status(201).json({
    like: true,
    likeCount: updated.likeCount,
    message: "Liked successfully",
  });
}

// video save controller
async function saveFood(req, res) {
  const { foodId } = req.body;
  const userId = req.user._id;

  if (!foodId) {
    return res.status(400).json({ message: "foodId is required" });
  }

  const isAlreadySaved = await saveModel.findOne({
    user: userId,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: userId,
      food: foodId,
    });
    return res.status(200).json({
      message: "food unsaved",
    });
  }

  const save = await saveModel.create({
    user: userId,
    food: foodId,
  });
  res.status(201).json({
    message: "food saved",
    save,
  });
}

async function getSaveFood(req, res) {
  const user = req.user;

  const save = await saveModel.find({ user: user._id }).populate("food");

  res.status(200).json({ message: "All Save food sucessfully", save });
}

// comment controller
async function FoodCommnet(req, res) {
  console.log("comment api hit");

  try {
    const { foodId, commentText } = req.body;
    const userId = req.user._id;

    if (!foodId) {
      return res.status(400).json({ message: "foodId is required" });
    }

    const comment = await commmentModel.create({
      foodId,
      userId,
      commentText,
    });
    res.status(201).json({
      success: true,
      message: "comment add",
      comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function ReplyComment(req, res) {
  try {
    const { userId, text } = req.boby;
    const { commentId } = req.params;

    const updated = await commmentModel.findByIdAndUpdate(
      commentId,
      {
        $push: {
          replies: { user: userId, text },
        },
      },
      { new: true },
    );

    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getAllComments(req, res) {
  try {
    const comments = await commmentModel
      .find({ foodId: req.params.foodId })
      .populate("userId", "fullname profilePic")
      .populate("replies.user", "name profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comment: comments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export {
  createFood,
  getFoodItems,
  likeFoodController,
  saveFood,
  getSaveFood,
  FoodCommnet,
  ReplyComment,
  getAllComments,
};

// add some functionality like DAOfile and express validation
