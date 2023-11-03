const {
  register,
  login,
  // getAllUsers,
  // getMyProfile,
  // editMyProfile
} = require("../controllers/userController");

//   const { isAuthenticatedUser, isAdmin } = require("../middleware/authenticate");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
