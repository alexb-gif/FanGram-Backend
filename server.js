const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cloudinary = require("cloudinary");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const userController = require("./controllers/userController");
const UserModal = require("./models/userModel");

require("dotenv").config();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://fan-gram-admin-panel.vercel.app",
      "https://fan-gram.vercel.app",
    ],
  })
);

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  session({
    secret: "ajafja90-20e=1enad",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport serialization and deserialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModal.findById(id);

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Routes Imports
const userRoute = require("./routes/userRoutes");
const businessPromotionRoute = require("./routes/businessPromotionRoutes");
const videoRoute = require("./routes/videoRoutes");
const orderRoute = require("./routes/orderRoutes");
const couponRoute = require("./routes/couponRoutes");
const celebrityRoute = require("./routes/celebrityRoutes");
const faqRoute = require("./routes/faqsRoutes");
const { default: mongoose } = require("mongoose");

// Configure Passport.js Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const issuer = profile.id;
      const existingUser = await userController.checkIfUserExists(issuer);

      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = new UserModal({
          username: profile.displayName,
          email: profile.emails[0].value,
          authId: issuer,
        });

        const savedUser = await newUser.save();
        done(null, savedUser);
      }
    }
  )
);

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use("/", userRoute);
app.use("/", videoRoute);
app.use("/", orderRoute);
app.use("/", couponRoute);
app.use("/", celebrityRoute);
app.use("/", businessPromotionRoute);
app.use("/", faqRoute);

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log("err: ", err.message);
  });

app.listen(5000, () => {
  console.log("server listening on port ", 5000);
});
