const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_URI).then((data) => {
    // console.log(`Monogodb connected with server : ${data.connection.host} `)
    console.log(`Monogodb connected with server`);
  });
};

// module.exports = connectDatabase
module.exports = connectDatabase;
