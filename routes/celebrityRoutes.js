const CelebrityController = require("../controllers/celebrityController");
const { authorizeAdmin, isAuthenticatedUser } = require("../utils/authMiddlewares");

const router = require("express").Router();


router.get("/api/celebrity/getAllFeaturedCelebrities", CelebrityController.getAllFeaturedCelebrities);
router.get("/api/celebrity/getAllCelebrities", CelebrityController.getAllCelebrities);
router.post("/api/celebrity/addNewCelebrity", isAuthenticatedUser, authorizeAdmin, CelebrityController.addNewCelebrity);
router.get("/api/celebrity/getCelebritiesByCategories", CelebrityController.getCelebritiesWithSameCategories);

module.exports = router;
