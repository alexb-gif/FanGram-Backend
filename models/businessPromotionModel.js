const mongoose = require("mongoose");

const businessPromotionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  jobTitle: { type: String },
  companyName: { type: String },
  numberOfEmployees: { type: Number },
  city: { type: String },
  product: { type: String },
  findUs: { type: String },
  budget: { type: String },
});

module.exports = mongoose.model("businessPromotions", businessPromotionSchema);
