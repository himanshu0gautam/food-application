import foodPartnerModel from "../model/foodpartner.model.js";
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

export { authFoodPartnerMiddleware }