const VideoController = require("../controllers/videoController");
const { authorizeAdmin, isAuthenticatedUser } = require("../utils/authMiddlewares");
const router = require("express").Router();



router.get("/api/video/:id",  VideoController.getVideoById);
router.get("/api/video/celebrity/:id",  VideoController.getAllVideosByCelebrityId);
router.get('/api/videos/celebrity/public/:id', VideoController.getPublicVideosByCelebrityId);
router.post("/api/video/addNewCelebrityVideo",  isAuthenticatedUser,authorizeAdmin, VideoController.addNewCelebrityVideo);
router.put("/api/video/edit/:id",  isAuthenticatedUser,authorizeAdmin, VideoController.editCelebrityVideo);


module.exports = router;
