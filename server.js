const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoute = require("./routes/userRoutes");
const { default: mongoose } = require("mongoose");
app.use("/user", userRoute);

// const connectDb = require("./config/dbConnection");
// connectDb();

//database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log("err: ", err.message);
  });

app.listen(5000, () => {
  console.log("server listening on port ", 5000);
});
