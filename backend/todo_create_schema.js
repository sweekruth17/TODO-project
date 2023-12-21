require("dotenv").config();
const connectDB = require("./DB/connect");
const Todo = require("./models/schema");
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Todo.deleteMany();
    console.log("Schema created and data is added");
  } catch (error) {
    console.log(error);
  }
};

start();
// have to run this file once to create a schema in DB
