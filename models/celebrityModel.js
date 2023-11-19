const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({

  name: { type: String, required: true },

  description: { type: String, required: true },

  celebrityImage: {
   
      type: String,
      required: true,
  },

  videoPrice: {
    type: Number,
    required: true,
  },

  meetAndGreetPrice: {
    type: Number,
    required: true,
  },

  ratings: { type: Number, default: 0 },
  fanDiscount: { type: String, required: true },

  tags: [{ type: String }],

  categories: [{ type: String, required: true }],

  responseInDays: { type: Number },

  isFeatured: { type: Boolean, default: false },

  offers: [
    {
      title: String,
      price: Number,
    },
  ],

   extras: [
    {
      title: String,
      price: Number,
    },
  ],

  recentVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "videos" }],
});

module.exports = mongoose.model("celebrities", celebritySchema);
