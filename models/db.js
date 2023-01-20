const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const collection_name = "ds_list";

var UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    maxlength: [64, "User Name is not allowed more than 64"],
    validate: {
      validator: function (val) {
        return val.length > 3 || val.length > 64;
      },
      message: () => `UserName must be at least 4 characters long`,
    },
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  mobile_number: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?[6-9][0-9]{9,9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
    maxlength: [64, "password is not allowed more than 64"],
    validate: {
      validator: function (val) {
        return val.length > 3 || val.length > 64;
      },
      message: () => `UserName must be at least 4 characters long`,
    },
  },
});

var UserListSchema = new Schema({});

var User = mongoose.model("User", UserSchema, collection_name);
var UserList = mongoose.model("UserList", UserListSchema, collection_name);

module.exports = { User, UserList };
