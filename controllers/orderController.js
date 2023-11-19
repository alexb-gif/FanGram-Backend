const OrderModel = require("../models/orderModel");
const UserModel = require("../models/userModel");
const cloudinary = require("cloudinary");

module.exports.postOrder = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "order",
    });

    const body = {
      ...req.body,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    const order = await OrderModel.create(body);

    return res.json({
      status: true,
      message: "Order Request has been submitted!",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.orderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    if (!orderId) {
      return res
        .status(400)
        .json({ status: false, message: "Insufficient details" });
    }

    // Check if the coupon exists
    const order = await OrderModel.findById(orderId)
      .populate("celebrityID", "name")
      .populate("userID", "username");
    // .populate("userID", "username");
    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    return res.json({ status: true, data: order });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getAllMyOrder = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ status: false, message: "Insufficient details" });
    }

    // Check if the coupon exists
    const order = await OrderModel.find({ userID: userId }).populate(
      "celebrityID"
    );

    return res.json({ status: true, data: order });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

// admin funcs:
module.exports.allOrder = async (req, res, next) => {
  try {
    const result = await OrderModel.find().populate("celebrityID", "name");
    return res.json({ status: true, data: result });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.approveOrDiscard = async (req, res, next) => {
  try {
    const { orderId, decision } = req.body;
    if (!orderId || !decision) {
      return res
        .status(400)
        .json({ status: false, message: "Insufficient details" });
    }

    let order = await OrderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    if (decision === "discard") {
      order.isDiscarded = true;
      await order.save();
      return res.json({
        status: true,
        message: "Order Request has been rejected!",
      });
    } else {
      order.isDiscarded = false;

      if (order.userAwarded === false) {
        const user = await UserModel.findById(order.userID);

        if (!user) {
          return res
            .status(404)
            .json({ status: false, message: "User not found" });
        }

        user.tcashEarned += 10; // Increment the tcashEarned by 10
        await user.save();

        order.userAwarded = true; // Set userAwarded to true after awarding
        await order.save();
      }

      return res.json({
        status: true,
        message: "Order Request has been Approved!",
      });
    }
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.updateOrderStatus = async (req, res, next) => {
  try {
    //    ['placed', 'sentToCollab', 'celebAccepted', 'delivered']  = [0,1,2,3]
    const { orderId, orderStatus } = req.body;
    if (!orderId || !orderStatus) {
      return res
        .status(400)
        .json({ status: false, message: "Insifficient details" });
    }
    let order = await OrderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    order.bookingStatus = orderStatus;
    await order.save();

    return res.json({
      status: true,
      message: "Order status has been updated",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.deliverOrder = async (req, res, next) => {
  try {
    // decision -> approve, discard
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ status: false, message: "Insifficient details" });
    }
    let order = await OrderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    order.isDelivered = true;
    order.bookingStatus = 3;

    await order.save();
    // send mail
    return res.json({
      status: true,
      message: "Order has been delivered",
    });
  } catch (ex) {
    return res.status(500).json({ status: false, message: ex.message });
  }
};
