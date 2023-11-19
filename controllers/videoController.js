const CelebrityModel = require("../models/celebrityModel");
const VideoModel = require("../models/videoModel");



// Admin
module.exports.addNewCelebrityVideo = async (req, res, next) => {

     try {
    const { ratings, celebrityID, occasion, message, celebrityVideo } = req.body;


    const celebrity = await CelebrityModel.findById(celebrityID);
    if (!celebrity) {
      return res.status(404).json({ status: false, message: 'Celebrity not found' });
    }

    const newVideo = await VideoModel.create({
      celebrityVideo,
      ratings,
      celebrityID,
      occasion,
      message,
    });

    celebrity.recentVideos.push(newVideo._id);
    await celebrity.save();

    return res.json({ status: true, message: 'Video created successfully', data: newVideo });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
  
};



module.exports.getAllVideosByCelebrityId = async (req, res, next) => {
  try {
    const celebrityID = req.params.id;

    const videos = await VideoModel.find({celebrityID});

    return res.json({ status: true, data: videos });
  } catch (ex) {
    
    return res.status(500).json({ status: false, message: ex.message });
  }
};
