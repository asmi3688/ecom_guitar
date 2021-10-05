const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Guitars = require("../model/Guitars");

router.get("/getAllGuitarDetails", (req, res) => {
  Guitars.find({}).then(guitardata => {
    if (!guitardata) {
      return res.status(404).json("Details not found!!!!");
    }
    if (guitardata) {
      return res.json(guitardata);
    }
  });
});

router.post("/getSingleGuitarDetails", (req, res) => {
  Guitars.find({ _id: req.body.itemId }).then(guitardata => {
    if (!guitardata) {
      return res.status(404).json("Details not found!!!!");
    }
    if (guitardata) {
      return res.json(guitardata);
    }
  });
});

router.post("/updateGuitarDetails/:id", (req, res) => {
  Guitars.find({ _id: req.params.itemId }).then(guitardata => {
    if (!guitardata) {
      return res.status(404).json("Details not found!!!!");
    }
    if (guitardata) {
      var newvalues = {
        $set: {
          guitarName: req.body.guitarName,
          guitarMake: req.body.guitarMake,
          guitarPrice: req.body.guitarPrice,
          guitarImage: req.body.guitarImage,
          guitarType: req.body.guitarType
        }
      };
      Guitars.updateOne(newvalues)
        .then(() => {
          return res.status(201).json({
            success: true,
            id: guitarData._id,
            message: "Guitar details updated successfully!"
          });
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: "Guitar details not updated successfully!"
          });
        });
    }
  });
});

router.post("/addGuitarDetails", (req, res) => {
  const guitarInfo = req.body;
  if (!guitarInfo) {
    return res.status(400).json({
      success: false,
      error: "You must provide the details"
    });
  }
  const guitarData = new Guitars(guitarInfo);
  if (!guitarData) {
    return res.status(400).json({ success: false, error: err });
  }
  guitarData
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: guitarData._id,
        message: "Guitar details added successfully!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Guitar details not added successfully!"
      });
    });
});

router.delete("/deleteitem", (req, res) => {
  Guitars.deleteOne({ _id: req.body.itemId })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Guitar details deleted successfully!"
      });
    })
    .catch(() => {
      return res.status(404).json({
        success: false,
        message: "Guitar details not deleted successfully!"
      });
    });
});
module.exports = router;
