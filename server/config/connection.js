const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://kevinc:qwe123@classactivities.znc6agm.mongodb.net",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;


//TODO - Below is what we will use for Apollo

// const mongoose = require('mongoose');

// //! Insert your MongoDB URL in the single-quotes below
// mongoose.connect(
//   process.env.MONGODB_URI || ''
// );

// module.exports = mongoose.connection;
