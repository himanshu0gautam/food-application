import foodModel from "../model/food.model.js";
import { cloudinary } from "../services/storage.service.js";


async function createFood(req, res) {

    try {

        // const fileUploadResult = await storageService.uploadfile(req.file.
        //     buffer, "")
        // console.log(fileUploadResult);

        const foodUploadResult = await cloudinary.uploader.upload(req.file.path, {
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
        console.log("upload eroorrrr", error);

    }

}


async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})

    res.status(200).json({
        message: "Food item Fetched Successfully", foodItems
    })

}


export { createFood, getFoodItems }   

// add some functionality like DAOfile and express validation