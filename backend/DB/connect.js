const { default: mongoose } = require("mongoose");
// const mongose = require("mongoose");


const URL = process.env.MONGODB_URL;
const connectDB = () => {
  console.log("Connecting to mongo DB");
  return mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;