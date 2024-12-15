const User = require("../Models/User");
const Task = require("../Models/Task");


const getTaskDetails = async(req,res)=>{
    try{
        const taskid = req.params.id;
        const task = await Task.findById(taskid);
        if(!task){
            return res.status(500).json({
                message: "Task Not Found",
                data: []
            })
        }
        return res.status(200).json({
            message: "Task Found", 
            data: task
        })
    }catch (error) {
        return res.status(500).json({ message: error });
      }
}

const updateTaskDetails = async(req,res)=>{
    try{
    const { taskid, title, priority, status, startTime, endTime } = req.body;
    if (!taskid) {
        return res.status(400).json({
          message: "Task ID is required.",
          data: [],
        });
      }
    const task = await Task.findById(taskid);
   
    if(!task){
        return res.status(500).json({
            message: "Task Not Found",
            data: []
        })
    }
    if (title) task.title = title;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (startTime) task.startTime = new Date(startTime);
    if (endTime) task.endTime = new Date(endTime);
    const updatedTask = await task.save();
    return res.status(200).json({
        message: "Task updated successfully."
      });
    }
    catch (error) {
        return res.status(500).json({
          message: "Internal server error.",
          error: error.message,
        });
      }

}

const deleteTask = async(req,res)=>{
    try{
        const { taskid } = req.body;

    if (!taskid) {
      return res.status(400).json({
        message: "Task ID is required.",
        data: [],
      });
    }

    const result = await Task.deleteMany({ _id: { $in: taskid } });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "No tasks found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully."
    });
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message,
          });
    }
}


module.exports = { getTaskDetails, updateTaskDetails, deleteTask };