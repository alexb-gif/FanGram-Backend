const CelebrityController = require("../controllers/celebrityController");
const { authorizeAdmin, isAuthenticatedUser } = require("../utils/authMiddlewares");

const router = require("express").Router();




router.post("/api/celebrity/addNewCelebrity", isAuthenticatedUser, authorizeAdmin, CelebrityController.addNewCelebrity);


module.exports = router;
