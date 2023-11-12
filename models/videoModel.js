const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({


  videoURL: [{ type: String }],

  ratings:{type: Number},

  celebrityID: { type: mongoose.Schema.Types.ObjectId, ref: 'celebrites' },


  occasions:{type: String},

  message:{type: String},

  
  
 
});


module.exports = mongoose.model("videos", videoSchema);