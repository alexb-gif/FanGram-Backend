const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
   userID: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'users'
   },

   bookingFor: String,

   celebrityID: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'celebrities'
   },
   
   bookingDate: Date,

   price: Number,

   bookingStatus: String,

   occasion: String,

   customMessage: String,

   language: String,

   videoPublic: Boolean,

   videoDeliveryTime: String,

//    ['placed', 'sentToCollab', 'celebAccepted', 'delivered']  = [0,1,2,3]
    status: { type: Number},

    extras: [{
      title: String,
      description: String,
      price: Number,
    }],

      couponID: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'coupons'
   },

});


module.exports = mongoose.model("orders", orderSchema);