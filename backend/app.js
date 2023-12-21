require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const todo = require("./models/schema");
const todo_routes = require("./routes/routes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./DB/connect");
const validateToken = require("./middleware/validateTokenHandler");

app.use(express.json()); //used to parse the data stream that is received form client
app.use("/api", todo_routes);
app.use(errorHandler);
app.use(validateToken);

app.get("/", (req, res) => {
  res.send("i am live!!!!!!!");
});

const main = async () => {
  try {
    await connectDB(process.env.MONGODB_URL); //establishing connection to mongo DB
    console.log("Connected to MongoDB... ");
    app.listen(PORT, () => {
      console.log("listening at port", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};
main();
