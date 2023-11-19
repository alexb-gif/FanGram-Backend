const CelebrityModel = require("../models/celebrityModel");
const VideoModel = require("../models/videoModel");

// Admin
module.exports.addNewCelebrityVideo = async (req, res, next) => {
  try {
    const { ratings, celebrityID, occasion, message, celebrityVideo } =
      req.body;

    const celebrity = await CelebrityModel.findById(celebrityID);
    if (!celebrity) {
      return res
        .status(404)
        .json({ status: false, message: "Celebrity not found" });
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

    return res.json({
      status: true,
      message: "Video created successfully",
      data: newVideo,
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

// Admin
module.exports.editCelebrityVideo = async (req, res, next) => {
  try {
    const videoID = req.params.id;
    const { ratings, occasion, message, celebrityVideo } = req.body;

    const video = await VideoModel.findById(videoID);
    if (!video) {
      return res
        .status(404)
        .json({ status: false, message: "Video not found" });
    }

    // Update video details
    video.ratings = ratings;
    video.occasion = occasion;
    video.message = message;
    video.celebrityVideo = celebrityVideo;

    // Save the updated video
    const updatedVideo = await video.save();

    return res.json({
      status: true,
      message: "Video updated successfully",
      data: updatedVideo,
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};


// Admin API
module.exports.getAllVideosByCelebrityId = async (req, res, next) => {
  try {
    const celebrityID = req.params.id;

    const videos = await VideoModel.find({ celebrityID });

    return res.json({ status: true, data: videos });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};


// Get all public videos of a specific celebrity
module.exports.getPublicVideosByCelebrityId = async (req, res, next) => {
  try {
    const celebrityID = req.params.id;

    const publicVideos = await VideoModel.find({
      celebrityID,
      showPublic: true,
    });

    return res.json({ status: true, data: publicVideos });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};



module.exports.getVideoById = async (req, res, next) => {
  try {
    const videoID = req.params.id;

    const video = await VideoModel.findById(videoID);

    if (!video) {
      return res
        .status(404)
        .json({ status: false, message: "Video not found" });
    }

    return res.json({ status: true, data: video });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};
