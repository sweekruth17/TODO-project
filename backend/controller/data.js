const errorHandler = require("../middleware/errorHandler");
const app = require("express");
const asyncHandler = require("express-async-handler");
const todoModel = require("../models/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Additional functions required for user handling

let dataId = 0;

/*
- create user
- 
*/
// --------------------------------------- functions related to user management ---------------------------------------------------------------

const signUp = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  console.log("User  details: ", req.body);
  if ((!username, !password, !email)) {
    res.status(400);
    throw new Error("All fields are mandatory...!!");
  }
  const checkEmail = await todoModel.findOne({ email });
  if (checkEmail) {
    res.status(400);
    throw new Error("User already registered");
  }
  //to store passwords in a encrypted manner
  const hashPass = await bcrypt.hash(password, 10);
  const user = { username, email, password: hashPass, tasks: [] };
  const result = await todoModel.create(user);
  if (result) {
    dataId = result.id;
    res.status(200).json({
      _id: result.id,
      email: result.email,
      message: "new user created",
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await todoModel.find();
  res.status(200).json({ allUsers, message: "this is a private route!!" });
});

//this takes only e-mail and password
const logIn = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  console.log("User  details: ", req.body);
  const result = await todoModel.findOne({ email });

  if (result && (await bcrypt.compare(password, result.password))) {
    dataId = result.id;
    const accessToken = jwt.sign(
      {
        user: {
          _id: result.id,
          email: result.email,
          username: result.username,
        },
      },
      process.env.ACCESS_TOKEN_SEC,
      {
        expiresIn: "10m",
      }
    );
    console.log(result);
    res.status(200).json({
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Something went wrong, check your credentials again!!");
  }
});

//update password functionality
const update = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
});

// -----------------------------------------------   functions related CURD operation on TODO----------------------------------
//making the below routs private, only users with the JWT token can access this

//have to query user then send his todo when user is logged in
const getAllTasks = asyncHandler(async (req, res) => {
  const allTodos = await todoModel.find({ _id: dataId }).tasks;
  res.status(200).json(allTodos);
});

const addNewTask = asyncHandler(async (req, res, next) => {
  const { title, description, duedate, status } = req.body;
  console.log(req.body);

  if (!title || !description || !duedate || !status) {
    res.status(400);
    throw new Error("All fields and mandatory..!");
  }
  const tasks = await todoModel.find({ _id: dataId }).tasks;
  const newTask = {
    title,
    description,
    duedate,
    status,
  };
  tasks.push(newTask);

  const result = await todoModel.updateOne({ _id: dataId }, tasks);

  res.status(201).json(todo);
});

const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `delete todo tasks ${req.params.id}` });
});
const updateTask = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Update todo tasks ${req.params.id}` });
});

module.exports = {
  getAllTasks,
  addNewTask,
  deleteTask,
  updateTask,
  signUp,
  getAllUsers,
  logIn,
};
