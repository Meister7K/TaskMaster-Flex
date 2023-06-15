
const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI);
// !just saw a note in class that Bryan shared saying we may need to require a 'dotenv' 

mongoose.connect(process.env.MONGODB_URI ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
