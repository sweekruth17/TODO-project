const express = require("express");
const router = express.Router();
const {
  addNewTask,
  deleteTask,
  updateTask,
  getAllTasks,
  signUp,
  getAllUsers,
  logIn,
  // currentUser,
} = require("../controller/data");
const validateToken = require("../middleware/validateTokenHandler");
//routes to add in future

// console.log("I am in API routes");
// ----------------------------------------------- user man routes --------------------------------------------------------------------------
router.route("/welcome").post(signUp);
router.get("/welcome", validateToken, getAllUsers);
router.route("/welcomeback").post(logIn);
// router.route("/current").get(currentUser);

//----------------------------------------------------- todo CURD routes -------------------------------------------------------------------
router.route("/todo").post(addNewTask);
router.route("/todo").get(getAllTasks);
router.route("/todo/:id").delete(deleteTask).put(updateTask);

module.exports = router;
