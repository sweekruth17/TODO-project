//title, description, due date, and status (pending, in progress, completed, etc.).
//username.password,email
const mongoose = require("mongoose");


const todoList = new mongoose.Schema({
  title: { type: String, required: [true, "Please enter Todo title..!!"] },
  description: {
    type: String,
    required: [true, "Please enter Todo description..!!"],
  },
  duedate: { type: Date, required: [true, "Please enter a Due Date..!!"] },
  status: {
    type: String,
    enum: ["pending", "progress", "completed"],
    default: "pending",
  },
});



const userSchema = new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    tasks:{type:[todoList]},
    password:{type:String}

});



module.exports = mongoose.model('Todo',userSchema);