const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cart = require("../model/Cart");

router.get("/getCountInCart", (req, res) => {
  Cart.find({}).then(cartdata => {
    if (!cartdata) {
      return res.status(404).json("0");
    }
    if (cartdata) {
      return res.json(cartdata.length);
    }
  });
});

router.post("/addToCart", (req, res) => {
  const cartInfo = req.body;

  Cart.findOne({ productId: cartInfo._id }).then(cartdata => {
    if (!cartdata) {
      const cartData = new Cart();
      cartData.productName = cartInfo.guitarName;
      cartData.productId = cartInfo._id;
      cartData.productPrice = cartInfo.guitarPrice;
      cartData.productQuantity = 0;
      cartData.userId = cartInfo.userId;
      cartData.productMake = cartInfo.guitarMake;
      cartData.productImage = cartInfo.guitarImage;
      cartData.guitarType = cartInfo.guitarType;

      cartData
        .save()
        .then(data => {
          return res.status(201).json({
            message: "Product added to cart successfully!"
          });
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: "Product not added to cart successfully!"
          });
        });
    }
    if (cartdata) {
      var newvalues = {
        $set: {
          productName: cartInfo.guitarName,
          productId: cartInfo._id,
          productPrice: cartInfo.guitarPrice,
          productQuantity: parseInt(cartdata.productQuantity) + parseInt(1),
          userId: cartInfo.userId,
          productMake: cartInfo.guitarMake,
          productImage: cartInfo.guitarImage,
          guitarType: cartInfo.guitarType
        }
      };
      Cart.updateOne(newvalues)
        .then(data => {
          console.log("update data", data);
          return res.status(201).json({
            success: true,
            id: cartdata._id,
            message: "Cart details updated successfully!"
          });
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: "Cart details not updated successfully!"
          });
        });
    }
  });  
});


module.exports = router;
