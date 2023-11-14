const VideoController = require("../controllers/videoController");
const { authorizeAdmin, isAuthenticatedUser } = require("../utils/authMiddlewares");
const router = require("express").Router();




router.post("/api/video/addNewCelebrityVideo",  isAuthenticatedUser,authorizeAdmin, VideoController.addNewCelebrityVideo);


module.exports = router;
