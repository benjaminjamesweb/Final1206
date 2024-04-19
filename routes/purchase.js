const express = require('express');
const Router = express.Router();
const PurchaseController = require('../controllers/purchase');


Router.post('/', PurchaseController.CreatePurchase)


Router.get('/', PurchaseController.GetAllPurchases);

// Delete Purchase
// Router.delete('/', PurchaseController.DeletePurchase);

module.exports = Router;