const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => {
    const userBody = req.body;


    if (!userBody.email || !userBody.password || !userBody.name) {
        return res.status(400).json({
            message: "Parameter missing... please enter all the required fields"
        })
    }

    const userExists = await userModel.findOne({ email: userBody.email});


    if (userExists) {
        return res.status(400).json({
            message: "This email is already assignmed to a user. Enter a different one please"
        })
    }


    const encryptedPassword = await bcrypt.hash(userBody.password, 10);






    const newUser = new userModel({
        name: userBody.name,
        email: userBody.email,
        password: encryptedPassword
    })

    try {
        const savedUser = await newUser.save();
        return res.status(201).json({
            message: "SUCCESS",
            data: savedUser
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const GetUsers = async (req, res) => {

try{
    const users = await userModel.find();
    return res.status(200).json({
        message: "User found",
        data: users
    })
} catch (error) {
    return res.status(500).json({
        message: "User not found",
        error
    })
}
}

const LoginUser = async (req, res) => {
    const userBody = req.body;

    
    if (!userBody.email || !userBody.password) {
        return res.status(400).json({
            message: "Parameter missing... please enter all the required fields"
        })
    }

    const userExists = await userModel.findOne({ email: userBody.email});

    if (!userExists) {
        return res.status(401).json({
            message: "User doesn't exist"
        })
    }

    const isPasswordSame = await bcrypt.compare(userBody.password, userExists.password);

    if (!isPasswordSame) {
        return res.status(401).json({
            message: "Wrong email or password"
        })
    }



    const accessToken = jwt.sign({
        email: userExists.email,
        name: userExists.name,
        id: userExists._id
    }, process.env.JWT_SECRET_KEY);

    const userData = {
        id: userExists._id,
        email: userExists.email,
        name: userExists.name,
        token: accessToken
    }

    return res.status(200).json({
        message: "User logged in",
        data: userData
    })

}


const GetUserByID = async (req, res) => {

}

module.exports = {
    RegisterUser,
    GetUsers,
    LoginUser
}