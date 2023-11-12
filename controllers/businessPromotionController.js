const PromotionModel = require("../models/businessPromotionModel");

// submit the form of business promotion:
module.exports.postBusinessPromotionRequest = async (req, res, next) => {
  try {
    const {
      name,
      mobileNumber,
      email,
      jobTitle,
      companyName,
      numberOfEmployees,
      city,
      product,
      findUs,
      budget,
    } = req.body;

    const newBusinessPromotion = await PromotionModel.create({
      name,
      mobileNumber,
      email,
      jobTitle,
      companyName,
      numberOfEmployees,
      city,
      product,
      findUs,
      budget,
    });

    return res.json({
      status: true,
      message: "Business promotion form submitted",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

// fetch all the business promotion requests:
module.exports.getAllRequest = async (req, res, next) => {
  try {
    const result = await PromotionModel.find();
    return res.json({ status: true, data: result });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

// fetch single promotion request:
module.exports.getSinglePromotionRequest = async (req, res, next) => {
  try {
    const { requestId } = req.query;
    if (!requestId) {
      return res
        .status(400)
        .json({ status: false, message: "request id must required" });
    }
    const result = await PromotionModel.findById(requestId);
    if (!result) {
      return res
        .status(404)
        .json({ status: false, message: "No reuest found on this id" });
    }

    return res.json({ status: true, data: result });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};
