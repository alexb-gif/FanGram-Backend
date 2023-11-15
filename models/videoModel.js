const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({


  celebrityVideos: [{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },],

  ratings:{type: Number},

  celebrityID: { type: mongoose.Schema.Types.ObjectId, ref: 'celebrites' },

  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },


  occasion:{type: String},

  message:{type: String},

  showPublic:{
    type:Boolean,
    default: true
  }

  
  
 
});


module.exports = mongoose.model("videos", videoSchema);