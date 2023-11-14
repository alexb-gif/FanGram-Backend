const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  celebrityID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "celebrities",
  },

  // from whome booking is?
  bookingTo: { name: String, gender: String },

  // from whome booking by if for myself then bookingBy has the my name?
  bookingBy: { name: String, gender: String },

  occasion: String,

  language: String,

  customMessage: String,

  fastDelivery: Boolean,

  extras: [
    {
      title: String,
      description: String,
      price: Number,
    },
  ],

  price: String,

  bookingDate: Date,

  //    ['placed', 'sentToCollab', 'celebAccepted', 'delivered']  = [0,1,2,3]
  bookingStatus: { type: Number },

  // videoPublic: Boolean,

  // videoDeliveryTime: String,

  couponID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupons",
    },
  ],
});

module.exports = mongoose.model("orders", orderSchema);
