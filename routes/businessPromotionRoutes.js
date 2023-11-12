const {
  postBusinessPromotionRequest,
  getAllRequest,
  getSinglePromotionRequest,
} = require("../controllers/businessPromotionController");
const router = require("express").Router();

router.post("/api/businessPromotion/submitForm", postBusinessPromotionRequest);
router.get("/api/businessPromotion/allForms", getAllRequest);
router.get("/api/businessPromotion/singleForm", getSinglePromotionRequest);

module.exports = router;
