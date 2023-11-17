const CelebrityModel = require("../models/celebrityModel");
const cloudinary = require("cloudinary");

// Admin
module.exports.addNewCelebrity = async (req, res, next) => {
  try {
    const {
      name,
      description,
      ratings,
      tags,
      categories,
      videoPrice,
      meetAndGreetPrice,
      fanDiscount,
      responseInDays,
      offers,
      isFeatured,
    } = req.body;


    

    const myCloud = await cloudinary.v2.uploader.upload(
      req.body.celebrityImage,
      {
        folder: "celebrityAvatar",
        width: 150,
        crop: "scale",
      }
    );

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
      celebrityImage: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    return res.json({
      status: true,
      message: "Celebrity added successfully",
      data: newCelebrity,
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
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
  console.log("Hello: ", categories);
  try {
    const celebrities = await CelebrityModel.find({
      categories: { $in: categories },
    }).limit(8);

    console.log("celeb: ", celebrities);
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
