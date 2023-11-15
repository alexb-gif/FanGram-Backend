const VideoController = require("../controllers/videoController");
const { authorizeAdmin, isAuthenticatedUser } = require("../utils/authMiddlewares");
const router = require("express").Router();



router.get("/api/video/celebrity/:id",  VideoController.getAllVideosByCelebrityId);
router.post("/api/video/addNewCelebrityVideo",  isAuthenticatedUser,authorizeAdmin, VideoController.addNewCelebrityVideo);


module.exports = router;
