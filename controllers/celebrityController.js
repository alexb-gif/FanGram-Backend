const CelebrityModel = require("../models/celebrityModel");
const cloudinary = require("cloudinary");

// Admin
module.exports.addNewCelebrity = async (req, res, next) => {
  try {
    const {
      name,
      description,
      celebrityImage,
      ratings,
      tags,
      categories,
      videoPrice,
      meetAndGreetPrice,
      fanDiscount,
      responseInDays,
      offers,
      extras,
      isFeatured,
    } = req.body;

    const newCelebrity = await CelebrityModel.create({
      name,
      description,
      videoPrice,
      meetAndGreetPrice,
      isFeatured,
      ratings: ratings || 0,
      tags: tags || [],
      categories: categories || [],
      responseInDays,
      fanDiscount,
      offers: offers || [],
      extras: extras || [],
      celebrityImage,
    });

    return res.json({
      status: true,
      message: "Celebrity added successfully",
      data: newCelebrity,
    });
  } catch (ex) {
    console.log("error: ", ex);
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.editCelebrity = async (req, res, next) => {
  try {
    const celebrityId = req.params.id;

    const existingCelebrity = await CelebrityModel.findById(celebrityId);

    if (!existingCelebrity) {
      return res
        .status(404)
        .json({ status: false, message: "Celebrity not found" });
    }

    // Update the celebrity details
    const {
      name,
      ratings,
      tags,
      categories,
      videoPrice,
      meetAndGreetPrice,
      responseInDays,
      offers,
      extras,
      isFeatured,
      celebrityImage,
      recentVideos,
    } = req.body;

    // Update the celebrity details in the database
    existingCelebrity.name = name || existingCelebrity.name;
    existingCelebrity.ratings = ratings || existingCelebrity.ratings;
    existingCelebrity.tags = tags || existingCelebrity.tags;
    existingCelebrity.categories = categories || existingCelebrity.categories;
    existingCelebrity.videoPrice = videoPrice || existingCelebrity.videoPrice;
    existingCelebrity.meetAndGreetPrice =
      meetAndGreetPrice || existingCelebrity.meetAndGreetPrice;
    existingCelebrity.responseInDays =
      responseInDays || existingCelebrity.responseInDays;
    existingCelebrity.offers = offers || existingCelebrity.offers;
    existingCelebrity.extras = extras || existingCelebrity.extras;
    existingCelebrity.isFeatured = isFeatured;

    existingCelebrity.celebrityImage =
      celebrityImage || existingCelebrity.celebrityImage;
    existingCelebrity.recentVideos =
      recentVideos || existingCelebrity.recentVideos;

    await existingCelebrity.save();

    return res.json({
      status: true,
      message: "Celebrity updated successfully",
      data: existingCelebrity,
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

// Admin
module.exports.deleteCelebrity = async (req, res) => {
  try {
    const celebrityId = req.params.id;

    const celebrity = await CelebrityModel.findByIdAndDelete(celebrityId);
    if (!celebrity) {
      return res
        .status(404)
        .json({ status: false, message: "Celebrity not found" });
    }

    return res.json({
      status: true,
      message: "Celebrity deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports.getCelebrityDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const celebrity = await CelebrityModel.findById(id);

    if (!celebrity) {
      return res
        .status(404)
        .json({ status: false, message: "Celebrity not found" });
    }

    return res.json({ status: true, data: celebrity });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getAllCelebrities = async (req, res, next) => {
  try {
    const celebrities = await CelebrityModel.find();
    return res.json({ status: true, data: celebrities });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getCelebritiesWithSameCategories = async (req, res, next) => {
  const { categories } = req.body;
  // console.log("Hello: ", categories);
  try {
    const celebrities = await CelebrityModel.find({
      categories: { $in: categories },
    }).limit(8);

    // console.log("celeb: ", celebrities);
    res.json({ success: true, data: celebrities });
  } catch (ex) {
    res.status(500).json({ success: false, message: ex.message });
  }
};

module.exports.getAllFeaturedCelebrities = async (req, res, next) => {
  try {
    const featuredCelebrities = await CelebrityModel.find({ isFeatured: true });
    return res.json({ status: true, data: featuredCelebrities });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.searchCelebrities = async (req, res) => {
  try {
    const { categories, celebrityName } = req.query;

    const searchCriteria = {};
    if (categories) {
      searchCriteria.categories = { $in: categories.split(",") };
    }
    if (celebrityName) {
      searchCriteria.name = { $regex: new RegExp(celebrityName, "i") };
    }

    const celebrities = await CelebrityModel.find(searchCriteria);

    return res.json({ status: true, data: celebrities });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
