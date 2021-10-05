const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../model/Users");


router.post("/signup", function(req, res) {
  Users.findOne({
    emailId: req.body.emailId
  }).then(user => {
    if (user) {
      return res.status(400).json({
        emailId: "Email already exists. Enter another email id!!!!"
      });
    } else {
      const avatar = gravatar.url(req.body.emailId, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new Users({
        emailId: req.body.emailId,
        password: req.body.password,
        role: req.body.role,
        contactNo: req.body.contactNo,
        userName: req.body.userName,
        avatar
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("error===>", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("error===>", err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  const emailId = req.body.emailId;
  const password = req.body.password;

  Users.findOne({ emailId: emailId }).then(user => {
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          userName: user.userName,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err)
              console.error(
                "There is some error in token check jwt token",
                err
              );
            else {
              res.json({
                success: true,
                token: `Catch ${token}`,
                userRole: user.role,
                userId: user._id
              });
            }
          }
        );
      } else {
        return res.status(400).json("Wrong password");
      }
    });
  });
});
module.exports = router;
