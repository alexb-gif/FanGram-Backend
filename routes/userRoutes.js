const passport = require("passport");
const {
  register,
  login,
  updateUser,
  
} = require("../controllers/userController");
const apiUrl = require("../utils/baseUrl")




const router = require("express").Router();

// Google Auth Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', "email"] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
  res.redirect(apiUrl);
  }
);





router.post("/api/user/register", register);
router.post("/api/user/login", login);
router.post("/api/user/update/:id", updateUser)

module.exports = router;
