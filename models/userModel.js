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

  role: {
    type: String,
    default: "user",
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
  tcashEarned: { type: Number, default: 0 },

  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  coupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupon",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "celebrities",
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
