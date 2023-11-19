const { default: mongoose } = require("mongoose");
const CoupenModel = require("../models/couponModel");

module.exports.addCoupen = async (req, res, next) => {
  try {
    const { name, code, priceOff } = req.body;

    const coupen = await CoupenModel.create({
      name,
      code,
      priceOff,
    });

    return res.json({
      status: true,
      message: "Coupen Created Successfully",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getAllCoupens = async (req, res, next) => {
  try {
    const result = await CoupenModel.find();
    return res.json({ status: true, data: result });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.giveCouponToUser = async (req, res, next) => {
  try {
    const { userId, couponId } = req.query;
    if (!userId || !couponId) {
      return res
        .status(400)
        .json({ status: false, message: "Insufficient details" });
    }

    // Check if the coupon exists
    const coupon = await CoupenModel.findById(couponId);
    if (!coupon) {
      return res
        .status(404)
        .json({ status: false, message: "Coupon not found" });
    }

    // Check if the user already has the coupon
    if (coupon.givenTo.includes(userId)) {
      return res
        .status(400)
        .json({ status: false, message: "User already has this coupon" });
    }

    // Give the coupon to the user
    coupon.givenTo.push(userId);
    await coupon.save();

    return res.json({
      status: true,
      message: "Coupon given to user successfully",
      data: coupon,
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.coupenAvailableForUser = async (req, res, next) => {
  try {
    const { userId, coupenName } = req.query;
    if (!userId || !coupenName) {
      return res
        .status(400)
        .json({ status: false, message: "Insufficient details" });
    }

    // Check if the coupon available to user
    const coupon = await CoupenModel.findOne({ name: coupenName });
    if (!coupon) {
      return res
        .status(404)
        .json({ status: false, message: "Coupon not found" });
    }

    // Check if the user already has the coupon
    if (coupon.givenTo.includes(userId)) {
      return res.status(200).json({ status: true, data: coupon });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Access to this coupen is denied" });
    }
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

// coupen availed by user
module.exports.coupenAvailed = async (req, res, next) => {
  try {
    const { userId, coupenNames } = req.query;

    if (!userId || !coupenNames) {
      return res
        .status(400)
        .json({ status: false, message: "Insufficient details" });
    }

    // Ensure coupenNames is an array
    const couponNamesArray = Array.isArray(coupenNames)
      ? coupenNames
      : [coupenNames];

    for (const coupenName of couponNamesArray) {
      const coupon = await CoupenModel.findOne({ name: coupenName });
      if (!coupon) {
        continue; // Skip if coupon is not found, or handle it as needed
      }

      // Update the givenTo array by removing the userId
      coupon.givenTo = coupon.givenTo.filter(
        (item) => item.toString() !== userId
      );

      await coupon.save();
    }

    return res.json({
      status: true,
      message: "Coupons availed by user",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};
