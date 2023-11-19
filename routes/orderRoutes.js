const {
  postOrder,
  allOrder,
  getAllMyOrder,
  orderDetails,
  approveOrDiscard,
  updateOrderStatus,
  deliverOrder,
} = require("../controllers/orderController");
const router = require("express").Router();

router.post("/api/order/postOrder", postOrder);
router.get("/api/order/allOrders", allOrder);
router.get("/api/order/allMyOrders", getAllMyOrder);
router.get("/api/order/orderDetails", orderDetails);
router.put("/api/order/orderApproval", approveOrDiscard);
router.put("/api/order/orderStatus", updateOrderStatus);
router.post("/api/order/deliverOrder", deliverOrder);

module.exports = router;
