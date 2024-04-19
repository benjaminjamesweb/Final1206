const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
  },
  itemPrice: {
    type: String,
    required: true,
  },
  dateOfPurchase: {
    type: Date,
    required: true
  },
  itemCategory: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseUser",
    required: true
}
}, {
    timestamps: true
});


const PurchaseModel = mongoose.model('UserPurchase', PurchaseSchema);

module.exports = PurchaseModel;
