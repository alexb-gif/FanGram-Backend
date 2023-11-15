const CelebrityModel = require("../models/celebrityModel");
const cloudinary = require("cloudinary");


// Admin
module.exports.addNewCelebrity = async (req, res, next) => {
  try {
    const {
      name,
      ratings,
      tags,
      categories,
      videoPrice,
      meetAndGreetPrice,
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
      videoPrice,
      meetAndGreetPrice,
      isFeatured,
      ratings: ratings || 0,
      tags: tags || [],
      categories: categories || [],
      responseInDays,
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
    const {id} = req.params;

    const celebrity = await CelebrityModel.findById(id);

    if (!celebrity) {
      return res.status(404).json({ status: false, message: 'Celebrity not found' });
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

  try {
    const celebrities = await Celebrity.find({ categories: { $in: categories } }).limit(8);
    res.json({ success: true, data: celebrities });
  } catch (ex) {
    res.status(500).json({ success: false, message: ex.message });
  }
}

module.exports.getAllFeaturedCelebrities = async (req, res, next) => {
  try {
    const featuredCelebrities = await CelebrityModel.find({ isFeatured: true });
    return res.json({ status: true, data: featuredCelebrities });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};



