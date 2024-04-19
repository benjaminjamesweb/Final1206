const PurchasesModel = require('../models/purchase');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const GetAllPurchases = async (req, res) => {

    try {
        const purchases = await PurchasesModel.find();
        return res.status(200).json({
            message: 'Succesfully found the purchases!',
            data: purchases
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching purchases!',
            error
        })
    }
}

const CreatePurchase = async (req, res) => {
    const allHeaders = req.headers;

    if (!allHeaders.authorization) {
        return res.status(401).json({
            message: "Please provide the token"
        })
    }
    const token = allHeaders.authorization;


    const decodedToken = jwt.decode(token, { complete: true});
    
    const userId = decodedToken.payload.id;

    const userExists = await UserModel.findById(userId);

    if (!userExists) {
        return res.status(401).json({
            message: 'You are not authorized to create a purchase!'
        })
    }

    const purchaseBody = req.body;

    const newPurchase = new PurchasesModel({
        user: userId,
        itemName: purchaseBody.itemName,
        itemDescription: purchaseBody.itemDescription,
        itemPrice: purchaseBody.itemPrice,
        dateOfPurchase: purchaseBody.dateOfPurchase,
        itemCategory: purchaseBody.itemCategory
    })

    const savedPurchase = await newPurchase.save();

    return res.status(201).json({
        message: "Purchase Created Succesfully!",
        data: savedPurchase
    })
    

}


module.exports = {
    GetAllPurchases,
    CreatePurchase
};