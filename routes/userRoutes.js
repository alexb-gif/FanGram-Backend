const passport = require("passport");
const {
  register,
  login,
  updateUser,
  addFavorite,
  getFavoriteCelebrities,
  getUserById,
  googleAuth,
} = require("../controllers/userController");
const apiUrl = require("../utils/baseUrl");

const router = require("express").Router();

// Google Auth Routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(apiUrl);
  }
);

//GOOGLE AUTHENTICATION
router.post("/auth/google", googleAuth);
router.post("/api/user/register", register);
router.post("/api/user/login", login);
router.post("/api/user/googleAuth", googleAuth);

router.get("/api/user/details/:id", getUserById);
router.put("/api/user/update", updateUser);
router.put("/api/user/addFavorite/:id", addFavorite);
router.get("/api/user/favoriteCelebrities/:userId", getFavoriteCelebrities);

module.exports = router;
