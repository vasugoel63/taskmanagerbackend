const mongoose = require('mongoose');
const { Schema, model, ObjectId } = mongoose;


const TaskSchema = new Schema({
    taskId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        required: true
    },
    userId:{
        type: ObjectId,
        required: true
    },
    priority:{
        type: String,
        enum: ['1','2','3','4','5'],
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
},{timestamps: true});
 const Task = model('Task', TaskSchema);
 module.exports = Task;
