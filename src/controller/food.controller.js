import foodModel from "../model/food.model.js";
import * as storageService from "../services/storage.service.js";
import uploadfile from "../services/storage.service.js"

async function createFood(req, res) {
    
    console.log(req.foodPartner);

    console.log(req.body);
    console.log(req.file);

    const fileUploadResult = await storageService.uploadfile(req.file.
        buffer, "")
    
        console.log(fileUploadResult);
        
    
    res.send("food item created")

}

export { createFood }