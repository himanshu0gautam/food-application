import multer from "multer";
import path from 'path'
import fs from 'fs'

if(!fs.existsSync("uploads")){
    fs.mkdirSync("uploads", { recursive: true })
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname
        cb(null, uniqueName)
    }
})

export const upload = multer({
    storage
})