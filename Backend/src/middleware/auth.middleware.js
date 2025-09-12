import foodPartnerModel from "../model/foodpartner.model.js";
import userModel from "../model/user.model.js"
import jwt from "jsonwebtoken"

async function authFoodPartnerMiddleware(req, res, next) {
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401)
        .json({ message: "Please login first"})
    }

    try {
        
     const decode = jwt.verify(token, process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decode.id);

        req.foodPartner = foodPartner

        next()

    } catch (error) {
        
        return res.status(401)
        .json({
            message: "invalid token"
        })
    }
}

async function authUserMiddleware(req, res, next) {
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401)
        .json({ message: "Please Login First"})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);
        
        req.user = user

        next()
    } catch (error) {
        
        return res.status(401).json({ message: "Invalid token"})
        
    }
}

export { authFoodPartnerMiddleware, authUserMiddleware }