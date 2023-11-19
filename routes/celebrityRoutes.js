const CelebrityController = require("../controllers/celebrityController");
const {
  authorizeAdmin,
  isAuthenticatedUser,
} = require("../utils/authMiddlewares");

const router = require("express").Router();

router.get("/api/celebrity/search/", CelebrityController.searchCelebrities);
router.get(
  "/api/celebrity/details/:id",
  CelebrityController.getCelebrityDetails
);
router.get(
  "/api/celebrity/getAllFeaturedCelebrities",
  CelebrityController.getAllFeaturedCelebrities
);
router.get(
  "/api/celebrity/getAllCelebrities",
  CelebrityController.getAllCelebrities
);


router.post(
  "/api/celebrity/getCelebritiesByCategories",
  CelebrityController.getCelebritiesWithSameCategories
);


router.post(
  "/api/celebrity/addNewCelebrity",
  isAuthenticatedUser,
  authorizeAdmin,
  CelebrityController.addNewCelebrity
);



router.put(
  "/api/celebrity/update/:id",
  isAuthenticatedUser,
  authorizeAdmin,
  CelebrityController.editCelebrity
);

router.delete('/api/celebrity/delete/:id',  isAuthenticatedUser,
  authorizeAdmin, CelebrityController.deleteCelebrity);



module.exports = router;
