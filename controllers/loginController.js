const { User } = require("../models/db");
const jwt = require("jsonwebtoken");

function generateAccessToken(access, TOKEN_SECRET, callBack) {
  var token = jwt.sign(access, TOKEN_SECRET);
  callBack(token);
}

loginController = (req, res) => {
  var inputs = req.body;
  if (inputs) {
    if (
      inputs.email !== "" &&
      inputs.email !== null &&
      inputs.password !== "" &&
      inputs.password !== null
    ) {
      User.findOne(
        {
          email: inputs.email,
          password: inputs.password,
        },
        {
          username: 1,
          password: 1,
          mobile_number: 1,
          email: 1,
        },
        (err, data) => {
          if (err) {
            res.status(400).send({ message: err });
          } else {
            var access_token = 1;
            var access = "userloginsecretkey";
            generateAccessToken(access_token, access, (callBack) => {
              if (callBack) {
                if (data !== null) {
                  res
                    .status(200)
                    .send({ message: "Logged In Successfully", c_data: data });
                } else {
                  res.send({ message: "No Record Found" });
                }
              } else {
                res
                  .status(401)
                  .send({ message: "Login Failed, Please try Again" });
              }
            });
          }
        }
      );
    } else {
      res.status(403).send({ message: "Inavlid User Details" });
    }
  } else {
    res.send({ message: "SOMETHING WENT WRONG" });
  }
};

module.exports = { loginController };
