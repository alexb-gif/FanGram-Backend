const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter Your User Name"],
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },

  password: {
    type: String,
  },

  authId: {
    type: String,
  },

  inviteCode: {
    type: String,
  },

  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
