const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
// !just saw a note in class that Bryan shared saying we may need to require a 'dotenv'

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskmaster-flexDB",
  {
    useNewUrlParser: true,
  }
);

module.exports = mongoose.connection;
