const {
  addCoupen,
  getAllCoupens,
  coupenAvailableForUser,
  coupenAvailed,
  giveCouponToUser,
} = require("../controllers/couponController");
const router = require("express").Router();

router.post("/api/coupen/addCoupen", addCoupen);
router.get("/api/coupen/allCoupen", getAllCoupens);
router.get("/api/coupen/coupenAvailable", coupenAvailableForUser);
router.put("/api/coupen/coupenToUser", giveCouponToUser);
router.get("/api/coupen/coupenAvailed", coupenAvailed);

module.exports = router;
