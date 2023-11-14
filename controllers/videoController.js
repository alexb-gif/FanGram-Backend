const CelebrityModel = require("../models/celebrityModel");
const VideoModel = require("../models/videoModel");
const { uploadVideosToCloudinary } = require("../utils/uploadToCloudinary");



// Admin
module.exports.addNewCelebrityVideo = async (req, res, next) => {

     try {
    const { ratings, celebrityID, occasion, message } = req.body;


    let CelebrityVideos = [];

    if (typeof req.body.celebrityVideos === "string") {
      CelebrityVideos.push(req.body.celebrityVideos);
    } else {
      CelebrityVideos = req.body.celebrityVideos;
    }

    // Upload videos to Cloudinary
    const celebrityVideosLinks = await uploadVideosToCloudinary(CelebrityVideos);

   


    const celebrity = await CelebrityModel.findById(celebrityID);
    if (!celebrity) {
      return res.status(404).json({ status: false, message: 'Celebrity not found' });
    }

    const newVideo = await VideoModel.create({
      celebrityVideos: celebrityVideosLinks,
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

