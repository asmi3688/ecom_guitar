const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new Schema({
  productName: String,
  productId: String,
  productPrice: Number,
  productQuantity: Number,
  userId: String,
  productMake: String,
  productImage: String,
  guitarType: String
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
