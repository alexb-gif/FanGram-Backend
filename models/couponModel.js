const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  priceOff: { type: Number },
  givenTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("coupons", couponSchema);
