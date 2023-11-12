const mongoose = require('mongoose');

const businessPromotionSchema = new mongoose.Schema({

     userID: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'users'
   },



  name: { type: String, required: true },
  
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  jobTitle: { type: String },
  companyName: { type: String },
  brandWebsite: { type: String },
  numberOfEmployees: { type: Number },
  city: { type: String },
  selectedProduct: { type: String },
  howDidYouFindUs: { type: String },
  budget: { type: String },
});

module.exports = mongoose.model("businessPromotions", businessPromotionSchema);
