
import userModel from "../model/user.model.js";
import foodPartnerModel from "../model/foodpartner.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function registerUser(req, res) {
    const { fullname, email, password } = req.body;
    try {
        const ifUserAlreadyExists = await userModel.findOne({
            email
        })

        if (ifUserAlreadyExists) {
            return res.status(200)
                .json({ message: "This user is Already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullname,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.cookie("token", token)
        res.status(201)
            .json({
                message: "user create successfully",
                user: {
                    _id: user._id,
                    email: user.email,
                    fullname: user.fullname
                }
            })
    } catch (error) {
        console.log("user are not created", error);

    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400)
            .json({ message: "Invalid email and password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400)
            .json({ message: "Invalid email and password" })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(200).json({
        message: "user login in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200)
        .json({
            message: "user logout sucessfully"
        });

}

async function registerPartner(req, res) {
    const { fullname, email, password } = req.body;

    try {
        const foodPartnerAlreadyExists = await foodPartnerModel.findOne({
            email
        })

        if (foodPartnerAlreadyExists) {
            return res.status(400).json({
                message: "Food Partner account already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const foodpartner = foodPartnerModel.create({
            fullname,
            email,
            password: hashPassword
        })

        const token = jwt.sign({ id: foodpartner._id }, process.env.JWT_SECRET)

        res.cookie("token", token)
        res.status(200).json({
            message: "Partner is login successfully",
            foodPartner: {
                _id: foodpartner._id,
                email: foodpartner.email,
                fullname: foodpartner.fullname
            }
        })

    } catch (error) {
        console.log("Partner are not created", error);
    }
}

async function loginfoodPartner(req, res) {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        return res.status(400)
            .json({ message: "invalid email and password" })
    }

    const isPasswordValid = bcrypt.compare(password, foodPartner.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid email and password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(200).json({
        message: "Partner is login successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            fullname: foodPartner.fullname
        }
    })
}

async function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200)
        .json({
            message: "user logout sucessfully"
        });

}


export {
    registerUser, loginUser, logoutUser,
    registerPartner, loginfoodPartner, logoutFoodPartner
}
