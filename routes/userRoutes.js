const passport = require("passport");
const {
  register,
  login,
  // getAllUsers,
  // getMyProfile,
  // editMyProfile
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

// Facebook Auth Routes

// router.get('/login/federated/facebook', passport.authenticate('facebook', { scope: ['profile', "email"] } ));
// router.get('/login/federated/facebook', passport.authenticate('facebook'))
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
  res.redirect(apiUrl);
  });


// router.get('/auth/facebook', passport.authenticate('facebook'));

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/'
//   }));




router.post("/register", register);
router.post("/login", login);

module.exports = router;
