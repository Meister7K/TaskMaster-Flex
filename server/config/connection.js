const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://MCReagan:michael312@classactivities.2d6rdyh.mongodb.net/taskmaster-flex",
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   // useCreateIndex: true,
  //   // useFindAndModify: false,
  // }
);

module.exports = mongoose.connection;


//TODO - Below is what we will use for Apollo

// const mongoose = require('mongoose');

// //! Insert your MongoDB URL in the single-quotes below
// mongoose.connect(
//   process.env.MONGODB_URI || ''
// );

// module.exports = mongoose.connection;
