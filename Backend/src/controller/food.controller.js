import foodModel from "../model/food.model.js";
import likemodel from "../model/like.model.js";
import saveModel from "../model/save.model.js";
import { cloudinary } from "../services/storage.service.js";


async function createFood(req, res) {

    try {

        // const fileUploadResult = await storageService.uploadfile(req.file.
        //     buffer, "")
        // console.log(fileUploadResult);

        // multer may provide file as req.file (single) or req.files (array) depending on middleware
        const file = req.file || (Array.isArray(req.files) && req.files[0]);
        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        const foodUploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "foodModel",
            resource_type: "video",
        })

        const foodItem = new foodModel({
            foodname: req.body.foodname,
            description: req.body.description,
            foodvideo: foodUploadResult.secure_url,
            foodPartner: req.foodPartner._id
        });
        await foodItem.save();

        res.json({
            message: "Food created successfully",
            food: foodItem,
        });

    } catch (error) {
        console.error("upload error:", error);
        // Return a helpful error response for the client
        return res.status(500).json({ message: 'Upload failed', error: error.message });

    }

}


async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})

    res.status(200).json({
        message: "Food item Fetched Successfully", foodItems
    })

}

// like controller
async function likeFoodController(req, res) {
    const { foodId } = req.body;

    const user = req.user;

    const isAlreadyLiked = await likemodel.findOne({
        user: user.id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likemodel.deleteOne({
            user: user._id,
            food: foodId
        });

        const updated = await foodModel.findByIdAndUpdate(
            foodId, { $inc: { likeCount: -1 }},
             { new: true }
        );

        return res.status(200).json({
        like: false,
        likeCount: updated.likeCount,
        message: "Unliked successfully",
      });
    }

     await likemodel.create({
        user: user._id,
        food: foodId
    })

    const updated = await foodModel.findByIdAndUpdate(
        foodId, { $inc: { likeCount: 1 }},
        { new: true }
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

    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })
        return res.status(200).json({
            message: "food unsaved"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })
    res.status(201).json({
        message: "food saved", save
    })
}

export { createFood, getFoodItems, likeFoodController, saveFood }

// add some functionality like DAOfile and express validation