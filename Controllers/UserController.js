const bcrypt = require("bcrypt");
const User = require("../Models/User");
const Task = require("../Models/Task");
const isAuthorized = require("../middleware/isAuthorized");
const getUserDashboardData = async(req,res)=>{
    const {userid} = req.body;
    const alltasks = await Task.find({userId: userid});
    const completedtask = await Task.countDocuments({ userId: userid, status: 'completed' });
    const pendingtask = await Task.countDocuments({ userId: userid, status: 'pending' });

    const totalTasks = alltasks.length;
    const completedPercentage = totalTasks ? (completedtask / totalTasks) * 100 : 0;
    const pendingPercentage = totalTasks ? (pendingtask / totalTasks) * 100 : 0;

    const tasksList = await Task.aggregate([
        { $match: { userId: userid } }, 
        {
            $group: {
                _id: "$priority", 
                total: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } } 
    ]);
    return res.status(200).json({
        message: 'Tasks fetched successfully',
        data: {
        tasksList,
          totalTasks,
          alltasks,
          completedtask,
          pendingtask,
          completedPercentage: completedPercentage.toFixed(2), 
          pendingPercentage: pendingPercentage.toFixed(2) 
        }
      });
}
const getTasksByUser = async (req,res)=>{
    const {userid} = req.body;
    const {status, priority, sort} = req.body;
    let filter = { userId: userid };
    if(status){
        filter.status = status; 
    }
    if(priority){
        filter.priority = priority;
    }
    const tasks = await Task.find(filter);

    if(!tasks){
        return res.status(200).json({
            message: "Empty Tasks",
            data: []
        }
        );
    }
 
    return res.status(200).json({
        message: "Tasks displayed Successfully",
        data: tasks
    })
}

const addTaskByUser = async(req,res)=>{
    console.log(req.body);
    const {userid, title, priority, status, startTime, endTime} = req.body;
    // if(!userid || !title || !priority || !status || !startTime || !endTime){
    //     return res.status(400).json({ message: "All fields are required." });
    // }
    const newTask = new Task({
        taskId: '1',
        userId: userid, 
        title,
        priority,
        status,
        startTime,
        endTime,
      });

      await newTask.save();
      res.status(201).json({
        message: "Task created successfully."
      });
}

module.exports = {getUserDashboardData, getTasksByUser, addTaskByUser}