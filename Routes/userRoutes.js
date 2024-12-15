const express = require("express");
const authController = require("../Controllers/AuthController");
const taskController = require("../Controllers/TaskController");
const userController =require("../Controllers/UserController");
const router = express.Router();
const {isAuthorized} = require('../middleware/isAuthorized');

const {getTasksByUser, addTaskByUser, getUserDashboardData} = userController;
const {getTaskDetails, updateTaskDetails, deleteTask} = taskController;
router.post('/addtask', isAuthorized, addTaskByUser);
router.post('/getdashboarddetails', isAuthorized, getUserDashboardData);
router.post('/gettasks', isAuthorized, getTasksByUser);
router.get('/gettaskdetails/:id', getTaskDetails);
router.post('/updatetaskdetails', updateTaskDetails);
router.post('/deletetaskdetails', deleteTask);

module.exports = router;