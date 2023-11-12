const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: { type: String, required: true },

  ratings: { type: Number, default: 0 },

  tags: [{ type: String }],

  responseInDays: { type: Number },
  
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'videos' }],

  offers: [{
    title: String,
    description: String,
    price: Number,
  }],

  recentVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'videos' }],
});


module.exports = mongoose.model("celebrities", celebritySchema);