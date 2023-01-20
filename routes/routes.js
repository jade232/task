const express = require("express");
const { loginController } = require("../controllers/loginController");
const { checkLogin } = require("../middlewares/authJwt");
const { UserList, User } = require("../models/db");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome User" });
});

//verifyAccessToken
function verifyAccessToken(token, TOKEN_SECRET, callBack) {
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      callBack(false);
    } else {
      callBack(user);
    }
  });
}

//Create User
router.post("/add-user", (req, res) => {
  if (req.body) {
    var userData = req.body;
    // var a_tokens = req.headers["atoken"];
    // var s_tokens = req.headers["stoken"];
    // if (a_tokens !== "" && a_tokens !== null && s_tokens !== "" && s_tokens !== null){
    //   verifyAccessToken(a_tokens, s_tokens, (user) => {
    //     if(user === false){
    //       res.status(500).send({message: "Oops, Access Token Expired ..!!"})
    //     } else {

    //     }
    //   })
    // }
     var addUser = new User(userData);
    addUser.save((err, userData) => {
      if (err) {
        res.status(401).send({ message: err });
      } else {
        res.status(200).send({
          message: "User Created Successfully",
          data: [userData],
        });
      }
    });
  } else {
    res.status(400).send({ message: "Something went wrong" });
  }
});

// Update user
router.patch("/user-list/:id", async (req, res) => {
  try {
    const updates = req.body;
    const id = req.params.id;
    const result = await User.findByIdAndUpdate(id, updates);
    res.status(200).send({ message: "User Update Successfully" });
  } catch (error) {
    console.log(err);
  }
});

// Delete user
router.delete("/user-list/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id, (err, message) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.status(200).send({ message: "User Deleted Successfully" });
      }
    });
  } catch (error) {
    console.log(err);
  }
});

// List User
router.get("/user-list", async (req, res) => {
  const list = await User.find();
  res.status(200).send(list);
});

//Login
router.post("/login", loginController);

module.exports = { router };
