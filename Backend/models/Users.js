const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      max: 50,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
    },
    username: {
      type: String,
      require: true,
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UsersData", UserSchema);
