const CelebrityModel = require("../models/celebrityModel")
const cloudinary = require('cloudinary')


module.exports.addNewCelebrity = async (req, res, next) => {
  try {
    const { name, ratings, tags, videoPrice, meetAndGreetPrice, responseInDays, offers } = req.body;


     const myCloud = await cloudinary.v2.uploader.upload(req.body.celebrityImage, {
        folder: 'celebrityAvatar',
        width: 150,
        crop: 'scale',
    })

    const newCelebrity = await CelebrityModel.create({
      name,
      videoPrice,
      meetAndGreetPrice,
      ratings: ratings || 0,
      tags: tags || [],
      responseInDays,
      offers: offers || [],
      celebrityImage: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    

    return res.json({ status: true, message: 'Celebrity added successfully', data: newCelebrity });
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