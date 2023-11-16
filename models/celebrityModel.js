const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: { type: String, required: true },

  celebrityImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
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

  tags: [{ type: String }],

  categories: [{ type: String, required: true }],

  responseInDays: { type: Number },

  isFeatured: { type: Boolean, default: false },

  offers: [
    {
      title: String,
      description: String,
      price: String,
    },
  ],

  recentVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "videos" }],
});

module.exports = mongoose.model("celebrities", celebritySchema);
