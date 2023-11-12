const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: { type: String, required: true },

  code:{type: String, required: true},

  priceOff:{type: Number, },
  percentOff:{type: Number, }

  

  
});

module.exports = mongoose.model("coupons", couponSchema);